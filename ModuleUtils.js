var defineModuleMap = {};
var defineModuleFactoryMap = {};
var defineModuleBuildingMap = {};

function defineModule(name, factory) {
    defineModuleFactoryMap[name] = factory;
}

function requireModule(name) {
    var m = defineModuleMap[name];
    if (m) {
        return m;
    }

    var factory = defineModuleFactoryMap[name];
    if (!factory) {
        throw new Error("[ERROR] module is not exist : " + name);
    }

    if(defineModuleBuildingMap[name]){
        throw new Error("[ERROR] module is circular reference : " + name );
    }

    defineModuleBuildingMap[name] = true;
    m = factory() || "return void";
    defineModuleBuildingMap[name] = false;

    defineModuleMap[name] = m;
    return m;
}




module.exports = {
    defineModule: defineModule,
    requireModule: requireModule
};