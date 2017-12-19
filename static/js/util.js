export default {
    setCookie(key,value,time){
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+time)
        document.cookie=key+ "=" +escape(value)+
        ((time==null) ? "" : ";expires="+exdate.toGMTString())
    },
    getCookie(key){
        if (document.cookie.length>0){
          var keyPlace = document.cookie.indexOf(key + "=")
          if (keyPlace != -1){
                keyPlace=keyPlace + key.length+1
                var valPlace=document.cookie.indexOf(";",keyPlace)
                if (valPlace==-1) valPlace=document.cookie.length
                return unescape(document.cookie.substring(keyPlace,valPlace))
           }else {
               return ""
           }
       }
       return ""
    },
    setLocalStorage(key,value){
        localStorage[key] = value
    },
    getLocalStorage(key){
        return localStorage[key]
    }
}
