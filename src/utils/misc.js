
import { MEDIA_URL} from './../constants/app';


export const mediaUrl = (link) => {

    const pattern = new RegExp('^[https|http]+://')

    if (!pattern.test(link)) {
        return `${MEDIA_URL}${link}`;
    } 

    return link;

}