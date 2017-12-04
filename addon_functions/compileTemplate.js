var compileTemplate = (function(){
    var openTag = '<%',
        closeTag = '%>',
        retTag = '$return',
        vars = 'var ',
        varsInTpl,
        codeArr = ''.trim ?
            [retTag + ' = "";', retTag + ' +=', ';', retTag + ';', 'print=function(){' + retTag + '+=[].join.call(arguments,"")},'] :
            [retTag + ' = [];', retTag + '.push(', ')', retTag + '.join("");', 'print=function(){' + retTag + '.push.apply(arguments)},'],
        keys = ('break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if'
        + ',in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with'
        + ',abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto'
        + ',implements,import,int,interface,long,native,package,private,protected,public,short'
        + ',static,super,synchronized,throws,transient,volatile'
        + ',arguments,let,yield').split(','),
        keyMap = {};

    for (var i = 0, len = keys.length; i < len; i++) {
        keyMap[keys[i]] = 1;
    }

    function _getCompileFn(source) {
        vars = 'var ';
        varsInTpl = {};
        varsInTpl[retTag] = 1;
        var openArr = source.split(openTag),
            tmpCode = '';

        for (var i = 0, len = openArr.length; i < len; i++) {
            var c = openArr[i],
                cArr = c.split(closeTag);
            if (cArr.length == 1) {
                tmpCode += _html(cArr[0]);
            } else {
                tmpCode += _js(cArr[0]);
                tmpCode += cArr[1] ? _html(cArr[1]) : '';
            }
        }

        var code = vars + codeArr[0] + tmpCode + 'return ' + codeArr[3];
        return new Function('$data', code);
    }

    function _html(s) {
        s = s
            .replace(/('|"|\\)/g, '\\$1')
            .replace(/\r/g, '\\r')
            .replace(/\n/g, '\\n');

        s = codeArr[1] + '"' + s + '"' + codeArr[2];

        return s + '\n';
    }

    function _js(s) {
        if (/^=/.test(s)) {
            s = codeArr[1] + s.substring(1).replace(/[\s;]*$/, '') + codeArr[2];
        }
        dealWithVars(s);

        return s + '\n';
    }

    function dealWithVars(s) {
        s = s.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g, '');
        var sArr = s.split(/[^\$\w\d]+/);
        for (var i = 0, len = sArr.length; i < len; i++) {
            var c = sArr[i];
            if (!c || keyMap[c] || /^\d/.test(c)) {
                continue;
            }
            if (!varsInTpl[c]) {
                if (c === 'print') {
                    vars += codeArr[4];
                } else {
                    vars += (c + '=$data.hasOwnProperty("' + c + '")?$data.' + c + ':window.' + c + ',');
                }
                varsInTpl[c] = 1;
            }
        }
    }


    var cache = {};

    return function (str, data) {
        var fn = !/\W/.test(str) ?
        cache[str] || (cache[str] = _getCompileFn(document.getElementById(str).innerHTML)) :
            _getCompileFn(str);
        return data ? fn(data) : fn;
    };
})();



module.exports= compileTemplate;