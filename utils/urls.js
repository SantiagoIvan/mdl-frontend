export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "pk_test_790F3D7CAE95DF62";


/**
 * A la hora de usar imagenes se tienen que contemplar 3 casos:
 * rutas usadas relativas
 * rutas absolutas consumiendo de otro lugar
 * ninguna ruta 
*/ 

/**Desde strpai, cuando se sube una imagen, ademas de toda la metadata que tiene, tiene el atributo url por eso */
export const imageToUrl = ( image ) => {
    if(!image){//si image es null, undefined, mando una por default
        return `/logo512.png`;//esta seria igual al dominio actual/logo512.png en public
    }
    if(image.url[0]==='/'){//Chequeo si es ruta relativa
        return `${API_URL}${image.url}`;
    }
    return image.url
}