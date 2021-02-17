// extract extention from url string.
export const getExtention = (filename: string) => {
  if ( /[.]/.exec(filename) ){
    return /[^.]+$/.exec(filename);
  }else{
    return 'png';
  }
};
