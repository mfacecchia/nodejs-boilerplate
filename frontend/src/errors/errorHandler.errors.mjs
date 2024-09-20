import 'dotenv/config';


export function logError(err){
    /**
     * Logs the caught `err` in the console if the app environment is 'development'
     */
    if(process.env.NODE_ENV === 'development') console.error(err);
}