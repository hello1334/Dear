import { useEffect, Suspense, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader, MTLLoader } from 'three/examples/jsm/Addons.js';

import LoadingStore from '@/store/loadingStore';
import newStampStore from '@/store/newStampStore';

import { ModelProps, StampProps } from './Main3DTypes';

import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const Model = ({ type, mtlPath, objPath, position, rotationY, onClick }: ModelProps) => {
  const setModelLoaded = LoadingStore((state) => state.setModelLoaded);
  const [objModel, setObjModel] = useState<THREE.Object3D | null>(null);
  const objRef = useRef<THREE.Object3D | null>(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log('로딩 디버깅중1111111');
    const loadModel = async () => {
      const materials = await new MTLLoader().loadAsync(mtlPath);
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      const obj = await objLoader.loadAsync(objPath);
      setObjModel(obj);
    };

    loadModel();
  }, [mtlPath, objPath]);

  useEffect(() => {
    console.log('로딩 디버깅중 2222222222');
    if (objModel) {
      objModel.position.set(...position); // 모델의 위치를 설정합니다.
      objModel.rotation.y = rotationY; // 모델의 y축 회전값을 설정합니다.
      if (type === 'giftbox') {
        objModel.scale.set(0.015, 0.015, 0.015);
        objModel.rotation.y = 0.3;
        objModel.rotation.x = 0.1;
      }
      // 로드된 모델을 ref에 할당합니다. (이전 예제에서는 이 부분이 누락되었었습니다.)
      if (objRef.current) {
        objRef.current = objModel;
      }
      setModelLoaded(true);
    }
  }, [objModel, position, rotationY, setModelLoaded]); // 모델, 위치, 회전값 변경 시 useEffect 재실행

  useFrame(() => {
    if (objRef.current) {
      objRef.current.rotation.y += 0.01;
    }

    if (clicked && objRef.current) {
      if (type === 'mailbox') {
        objRef.current.rotation.y = -0.6;
      } else if (type === 'house') {
        objRef.current.rotation.y = -1;
      }
      const cameraPosition = new THREE.Vector3(0, 0, 0.05);
      const targetPosition = objRef.current.position.clone();
      if (type === 'house') {
        targetPosition.add(new THREE.Vector3(0.35, 0.4, 0));
      } else if (type === 'mailbox') {
        targetPosition.add(new THREE.Vector3(0.1, 1.3, 0.3));
      }
      const distance = cameraPosition.distanceTo(targetPosition);

      if (distance > 0.1) {
        const direction = targetPosition.clone().sub(cameraPosition).normalize().negate();
        objRef.current.position.add(direction.multiplyScalar(0.02));
      } else {
        // 애니메이션 완료 후 페이지 이동
        onClick();
      }
    }
  });

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
    }
  };

  return objModel ? <primitive object={objModel} ref={objRef} onClick={handleClick} /> : null;
};

type Main3DProps = {
  isRight: boolean;
  setIsRight: (isRight: boolean) => void;
};

const Main3D = ({ isRight, setIsRight }: Main3DProps) => {
  const navigate = useNavigate();
  // const setModelLoaded = LoadingStore((state) => state.setModelLoaded);

  const { stamps }: { stamps: StampProps[] } = newStampStore();
  console.log('stamps:', stamps);

  const controls = useRef<OrbitControlsImpl>(null);

  const handleClickHouse = () => {
    console.log('House model clicked');
    // Perform any action or navigate
    // setModelLoaded(false);
    navigate('/mainmenu');
  };

  const handleClickMailbox = () => {
    console.log('Mailbox model clicked');
    // Perform any action or navigate
    // setModelLoaded(false);
    navigate('/stamps');
  };

  return (
    <Canvas camera={{ position: [0, 0, 3] }} style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={1} />
      <directionalLight position={[-5, -1.2, 5]} intensity={2} />
      <PerspectiveCamera
        makeDefault
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        position={[0, 0, 0.05]}
      />
      <OrbitControls
        ref={controls}
        enableZoom={false}
        enableDamping={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2.3}
        maxAzimuthAngle={-Math.PI / 10}
        onChange={() => {
          if (controls && controls.current) {
            if (controls.current.getAzimuthalAngle() <= -0.8) {
              if (isRight) return;
              setIsRight(true);
            } else if (controls.current.getAzimuthalAngle() >= -0.8) {
              if (!isRight) return;
              setIsRight(false);
            }
          }
        }}
      />
      <Suspense fallback={null}>
        <Model
          type="house"
          mtlPath="models/house/house.mtl"
          objPath="models/house/house.obj"
          position={[3, -1.2, -1]}
          rotationY={-1}
          onClick={handleClickHouse}
        />
        <Model
          type="mailbox"
          mtlPath="models/mailbox/mailbox.mtl"
          objPath="models/mailbox/mailbox.obj"
          position={[1, -1.2, -3]}
          rotationY={-0.6}
          onClick={handleClickMailbox}
        />
        {stamps && stamps.length > 0 && (
          <Model
            type="giftbox"
            mtlPath="models/giftbox/giftbox.mtl"
            objPath="models/giftbox/giftbox.obj"
            position={[1, 0.5, -3]}
            rotationY={-0.6}
            onClick={() => {}}
          />
        )}
      </Suspense>
    </Canvas>
  );
};

export default Main3D;

// const Main3D = () => {
//   const Model = ({ mtlPath, objPath, position, rotationY, onClick }: ModelProps) => {
//     const [objModel, setObjModel] = useState<THREE.Object3D | null>(null);
//     const { scene } = useThree();

//     useEffect(() => {
//       const loadModel = async () => {
//         const materials = await new MTLLoader().loadAsync(mtlPath);
//         materials.preload();
//         const objLoader = new OBJLoader();
//         objLoader.setMaterials(materials);
//         const object = await objLoader.loadAsync(objPath);
//         setObjModel(object);
//       };
//       loadModel();
//     }, [mtlPath, objPath]);

//     useEffect(() => {
//       if (objModel) {
//         objModel.position.set(...position);
//         objModel.rotation.y = rotationY;
//         scene.add(objModel);

//         return () => {
//           scene.remove(objModel);
//         };
//       }
//     }, [objModel, scene, position, rotationY]);

//     return null;
//   };

//   return (
//     <Canvas camera={{ position: [0, 0, 3] }} style={{ height: '100%', width: '100%' }}>
//       <ambientLight intensity={1} />
//       <directionalLight position={[-5, -1.2, 5]} intensity={2} />
//       <PerspectiveCamera
//         makeDefault
//         fov={75}
//         aspect={window.innerWidth / window.innerHeight}
//         near={0.1}
//         far={1000}
//         position={[0, 0, 0.05]}
//       />

//       {/* OrbitControls 설정 */}
//       <OrbitControls
//         enableZoom={false}
//         enableDamping={false}
//         maxPolarAngle={Math.PI / 2}
//         minPolarAngle={Math.PI / 2}
//         minAzimuthAngle={-Math.PI / 2.3}
//         maxAzimuthAngle={-Math.PI / 10}
//       />

//       <Suspense fallback={null}>
//         <Model
//           mtlPath="models/house/house.mtl"
//           objPath="models/house/house.obj"
//           position={[3, -1.2, -1]}
//           rotationY={-1}
//         />
//         <Model
//           mtlPath="models/mailbox/mailbox.mtl"
//           objPath="models/mailbox/mailbox.obj"
//           position={[1, -1.2, -3]}
//           rotationY={-0.6}
//         />
//       </Suspense>
//     </Canvas>
//   );
// };
// export default Main3D;
