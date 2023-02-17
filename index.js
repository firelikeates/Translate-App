const to = document.querySelector("#toselect");
const from = document.querySelector("#fromselect");
const fromtext = document.querySelector("#fromlangtext");
const totext = document.querySelector("#tolang");
const translatebtn = document.querySelector("#button");
const i_tag = document.querySelector("#abo");

async function lang_to_select() {
    let res = await fetch("./languages.json");
    var json = await res.json()
    var to_string = "";
    var from_string = "";
    for (let i in json) {
        to_string += `<option value=${i}>${json[i]}</option>`
        from_string += `<option value=${i}>${json[i]}</option>`
    }
    to.innerHTML = to_string;
    from.innerHTML = from_string
    from.value="en-GB"
    to.value="tr-TR"
}
lang_to_select()

translatebtn.addEventListener("click",async function() {
    if (fromtext.value !== "") {
        console.log("from",fromtext.value,from.value)
        console.log("to",totext.value,to.value)

        var res =await fetch(`https://api.mymemory.translated.net/get?q=${fromtext.value}&langpair=${from.value}|${to.value}`);
        var json = await res.json()
        console.log(json)
        totext.value=json.matches[0].translation
        console.log(totext.value);
    }
})
fromtext.addEventListener('keyup',function(){
    if(fromtext.value===""){
        totext.value=""
    }
})
i_tag.addEventListener("click",function(){
    var from_text = fromtext.value;
    fromtext.value=totext.value
    totext.value=from_text

    var from_lang = from.value;
    from.value=to.value;
    to.value=from_lang
})
