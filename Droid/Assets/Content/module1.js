import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from 'https://threejsfundamentals.org/3rdparty/dat.gui.module.js';

let controls;

function main() 
{
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({canvas,
        antialias: true 
    });

    const fov = 90;
    const aspect = 1;
    const near = 0.1;
    const far = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(1.32, 1.32, 2);

    controls = new OrbitControls(camera, canvas);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enableZoom = false;
    controls.enablePan = false;

    const scene = new THREE.Scene();
    //scene.background = new THREE.Color('#FFFFFF');

    /*class ColorGUIHelper 
    {
        constructor(object, prop) {
          this.object = object;
          this.prop = prop;
        }
        get value() {
          return `#${this.object[this.prop].getHexString()}`;
        }
        set value(hexString) {
          this.object[this.prop].set(hexString);
        }
    }*/

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.SpotLight(color, intensity);
        light.position.set(-3.5, 4, -3.5);
        light.target.position.set(0, 0, 0);
        light.distance = 20;
        light.angle = 0.6283;
        light.penumbra = 1;
        scene.add(light);
        scene.add(light.target);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.SpotLight(color, intensity);
        light.position.set(3.5, 4, 3.5);
        light.target.position.set(0, 0, 0);
        light.distance = 20;
        light.angle = 0.6283;
        light.penumbra = 1;
        scene.add(light);
        scene.add(light.target);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.SpotLight(color, intensity);
        light.position.set(3.5, 4, -3.5);
        light.target.position.set(0, 0, 0);
        light.distance = 20;
        light.angle = 0.6283;
        light.penumbra = 1;
        scene.add(light);
        scene.add(light.target);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.SpotLight(color, intensity);
        light.position.set(-3.5, 4, 3.5);
        light.target.position.set(0, 0, 0);
        light.distance = 20;
        light.angle = 0.6283;
        light.penumbra = 1;
        scene.add(light);
        scene.add(light.target);
    }
    
    let car;
    let cars;
    {

        const gltfLoader = new GLTFLoader();
        gltfLoader.load('Blender ( Modifier Applied Low Poly ).glb', (gltf) => {
            const root = gltf.scene;
            cars = root;
            scene.add(root);
            console.log(dumpObject(root).join('\n'));

            const material = new THREE.MeshStandardMaterial({
                color: 0xFF0000,
                emissive: 0x770000
            });
            material.roughness = 0;
            material.metalness = 1;

            /*const gui = new GUI();
            gui.addColor(new ColorGUIHelper(material, 'color'), 'value').name('color');
            gui.addColor(new ColorGUIHelper(material, 'emissive'), 'value').name('emissive');
            gui.add(material, 'roughness', 0, 1, 0.01);
            gui.add(material, 'metalness', 0, 1, 0.01);*/

            car = root.getObjectByName('Cube030');
            car.material = material;            
            car = root.getObjectByName('Cube.030_1');
            car.material = material;
            car = root.getObjectByName('Cube042');
            car.material = material;
            car = root.getObjectByName('Bonnet');
            car.material = material;
            car = root.getObjectByName('Rear_Bumper');
            car.material = material;
            car = root.getObjectByName('Rear_Trunk');
            car.material = material;
            car = root.getObjectByName('Rear_Spolier');
            car.material = material;
            car = root.getObjectByName('Cube021');
            car.material = material;
            car = root.getObjectByName('Cube');
            car.material = material;
            car = root.getObjectByName('Side_Skirt');
            car.material = material;

            const glass = new THREE.MeshPhysicalMaterial({
                color: 0xFFFFFF,
                emissive: 0x333333
            });
            glass.roughness = 0;
            glass.metalness = 1;
            glass.transparent = true;
            glass.opacity = 0.55;

            car = root.getObjectByName('Side_Window');
            car.material = glass;
            car = root.getObjectByName('Rear_Window');
            car.material = glass;
            car = root.getObjectByName('Windshied');
            car.material = glass;
            car = root.getObjectByName('Headlight_Cover');
            car.material = glass;

            car = root.getObjectByName('Rear_Tire');
            car.material = new THREE.MeshPhongMaterial({color: 0x000000});
            car = root.getObjectByName('Front_Tire');
            car.material = new THREE.MeshPhongMaterial({color: 0x000000});

            const carbon = new THREE.MeshPhongMaterial({color: 0x000000});

            car = root.getObjectByName('Roof_Rack');
            car.material = carbon;
            car = root.getObjectByName('Exhaust_Cover');
            car.material = carbon;
            car = root.getObjectByName('Side_Spiler');
            car.material = carbon;
            car = root.getObjectByName('Front_Bodykit_1');
            car.material = carbon;
            car = root.getObjectByName('Front_Bodykit_2');
            car.material = carbon;
            car = root.getObjectByName('inside_side_air_filter_1');
            car.material = carbon;
            car = root.getObjectByName('inside_side_air_filter_2');
            car.material = carbon;
            car = root.getObjectByName('Inside_higher_grill');
            car.material = carbon;
            car = root.getObjectByName('Lower_inside_grill');
            car.material = carbon;
            car = root.getObjectByName('Middle_inside_grill');
            car.material = carbon;
            car = root.getObjectByName('Front_Bodykit_Side');
            car.material = carbon;
            car = root.getObjectByName('Side_Air_Intake_Filter');
            car.material = carbon;
            car = root.getObjectByName('Cube.021_1');
            car.material = carbon;
        });

        gltfLoader.load('untitled.glb',(gltf) => {
            const root = gltf.scene;
            scene.add(root);
            console.log(dumpObject(root).join('\n'));
            for (const garagepart of root.children) {
                garagepart.material = new THREE.MeshPhongMaterial({color: 0x222222});
            }
        });
    }

    function render(time) {
        time *= 0.0005;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        camera.position.y = (Math.sin(time) / 2 + 1);

        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function dumpObject(obj, lines = [], isLast = true, prefix = '') {
        const localPrefix = isLast ? '└─' : '├─';
        lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
        const newPrefix = prefix + (isLast ? '  ' : '│ ');
        const lastNdx = obj.children.length - 1;
        obj.children.forEach((child, ndx) => {
          const isLast = ndx === lastNdx;
          dumpObject(child, lines, isLast, newPrefix);
        });
        return lines;
      }

    requestAnimationFrame(render);
}

main();