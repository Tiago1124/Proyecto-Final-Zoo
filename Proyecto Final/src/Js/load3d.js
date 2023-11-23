function loadObjMtl(path, nameMTL, nameOBJ) {
    // 1. Load MTL (Texture)
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setResourcePath(path);
    mtlLoader.setPath(path);
    mtlLoader.load(nameMTL, function (material) {
        material.preload();

        // 2. Load OBJ (Mesh)
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath(path);
        objLoader.setMaterials(material);
        objLoader.load(nameOBJ, function (object) {
            scene.add(object);
            object.scale.set(1,1,1);
            object.rotation.x = (Math.PI)*2;
        });
            
        });
    }