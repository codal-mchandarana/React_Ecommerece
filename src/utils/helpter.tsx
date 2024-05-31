const convertImageUrl:any = (str:string)=>{
    let helperStr ;
    str = str.replaceAll('{','');
    str = str.replaceAll('}','');

    helperStr = str.split(',')
    return helperStr
};

export default convertImageUrl;