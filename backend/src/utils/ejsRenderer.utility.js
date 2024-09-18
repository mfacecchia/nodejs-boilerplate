import ejs from 'ejs';
import isObject from './isObject.utility.js';
import { ViewRenderError } from '../errors/custom.errors.js';


export function renderEjs(path, data = null){
    /**
     * Renders an EJS template (defined in the `path`)
     * Returns the rendered version in form of string or throws `ViewRenderError`
     */
    let renderedHTMLTemplate;
    if(!isObject) data = {};
    ejs.renderFile(path, data, (error, htmlStr) => {
        if(error) throw new ViewRenderError('Error while generating Email.');
        else renderedHTMLTemplate = htmlStr;
    });
    return renderedHTMLTemplate;
}