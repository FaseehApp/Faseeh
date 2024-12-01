import { ipcRenderer } from "electron";




const getDef = async (def: string) => {
    let definition = await window.electron.ipcRenderer.invoke("get-definition", def);
    console.log(def,definition);
};


export default getDef;