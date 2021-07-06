import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';

import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/shaders/FXAAShader.js';

let camera, scene, renderer, clock, container;

let composer1, fxaaPass;

let cars;

function init() 
{

    container = document.getElementById('canvas');


    const fov = 90;
    const aspect = 1;
    const near = 0.1;
    const far = 50;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(1.32, 1.32, 2);

    scene = new THREE.Scene();

    clock = new THREE.Clock();

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

    //
    let car;
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

            const gui = new GUI();
            gui.addColor(new ColorGUIHelper(material, 'color'), 'value').name('color');
            gui.addColor(new ColorGUIHelper(material, 'emissive'), 'value').name('emissive');
            gui.add(material, 'roughness', 0, 1, 0.01);
            gui.add(material, 'metalness', 0, 1, 0.01);

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

    class ColorGUIHelper 
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
    }
    //

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.autoClear = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    //

    const renderPass = new RenderPass(scene, camera);

    //

    fxaaPass = new ShaderPass(FXAAShader);

    const pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms['resolution'].value.x = 1 / (container.offsetWidth * pixelRatio);
    fxaaPass.material.uniforms['resolution'].value.y = 1 / (container.offsetHeight * pixelRatio);

    composer1 = new EffectComposer(renderer);
    composer1.addPass(renderPass);
    composer1.addPass(fxaaPass);

    //

    window.addEventListener('resize', onWindowResize, false);

    const controls = new OrbitControls(camera, container);
    controls.update();

    requestAnimationFrame(render);
}

function onWindowResize() 
{

    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    composer1.setSize(container.offsetWidth, container.offsetHeight);

    const pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms['resolution'].value.x = 1 / (container.offsetWidth * pixelRatio);
    fxaaPass.material.uniforms['resolution'].value.y = 1 / (container.offsetHeight * pixelRatio);

    
}

function render(time) 
{

    onWindowResize();

    renderer.setViewport(0, 0, container.offsetWidth, container.offsetHeight);

    composer1.render();

    requestAnimationFrame(render);
}

function dumpObject(obj, lines = [], isLast = true, prefix = '') 
{
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

init();