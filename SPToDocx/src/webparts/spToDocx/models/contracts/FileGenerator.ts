import { IFileGeneration } from './../interfaces/ITemplateList';
import { FileData } from './../types/types';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
let InspectModule = require('docxtemplater/js/inspect-module');
import PizZip from 'pizzip';


export default class FileGenerator {
    protected fileName: string;
    protected urlFile: string;
    protected data: IFileGeneration[];
    protected iModule;

    constructor({fileName, urlFile}:FileData , data:IFileGeneration[]) {
        this.fileName = fileName;
        this.urlFile = urlFile;
        this.data = data;

        this.iModule = InspectModule();
    }
    
    private replaceErrors(replaceKey, value) {
        if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce((error, key) => {
                error[key] = value[replaceKey];
                return error;
            }, {});
        }
        return value;
    }

    private errorHandler(error) {
        console.log(JSON.stringify({ error: error }, this.replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map((err) => {
                return error.properties.explanation;
            }).join("\n");
            console.log('errorMessages', errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
    }

    private async urlToFile(file:FileData):Promise<File>{
        const fileBlob = await fetch(file.urlFile).then(r=> r.blob());
        const fileObj = await new File([fileBlob], file.fileName, {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
        return fileObj;
    }

     private getFileTags(doc) {
        doc.attachModule(this.iModule);
        doc.render(); // doc.compile can also be used to avoid having runtime errors
        var parsedTags = this.iModule.getAllTags();
        //let fileTags = String(doc.getFullText()).match(tagRegex);
        let tags = Object.keys(parsedTags);
        let uniqueTags = Array.from(new Set([...tags]));
        return uniqueTags;
    }

    public async generateFile() {
        try {
            const file = await this.urlToFile({fileName: this.fileName, urlFile: this.urlFile});
            const reader = new FileReader();
                reader.onload = async () => {
                    let zip = new PizZip(reader.result);
                    let doc = new Docxtemplater().loadZip(zip);
                    let fileTags = this.getFileTags(doc);
                    this.data.forEach(field => {
                        fileTags.forEach(tag => {
                            if(tag === field.fieldRef){
                                let jString = JSON.stringify({[tag]: field.value});
                                let jObject = JSON.parse(jString);
                                
                                doc.setData({jObject});
                            }
                        });
                    });
                   
                    
                    try {
                        doc.render();
                    }
                    catch (error) {
                        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
                        this.errorHandler(error);
                    }
        
                    let out:Blob = doc.getZip().generate({
                        type:"blob",
                        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    }); //Output the document using Data-URI
                    saveAs(out, 'teste.docx');
            };
         reader.readAsBinaryString(file);
            
        }
        catch (error) {
            // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
            this.errorHandler(error);
        }
    }
}
