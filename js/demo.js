(async function(root, prepend, append, url, timeout) {

    const getNodes = async function(path) {
        const r = await fetch("_" + path + ".html");
        const b = await r.text();
        const h = new DOMParser().parseFromString(b, "text/html");
        return h.body.childNodes;
    };

    const firstChild = root.childNodes[0];

    prepend.forEach(async (t, i) => {
        console.log(t, i)
        ;(await getNodes(t)).forEach((n) => {
            root.insertBefore(n, firstChild);
        });
    });

    append.forEach(async (t, i) => {
        console.log(t, i)
        const n = await getNodes(t);
        ;(await getNodes(t)).forEach((n) => {
            root.append(n);
        });
    });

    timeout(() => {
        const hrefTarget = url.pathname == '/' ? '/index.html' : url.pathname;
        const selector = 'nav a[href="'+hrefTarget+'"]';
        const link = document.querySelector(selector);
        if(link) {
            link.classList.add('current');
        }
    }, 300);


})(document.body, ["header"], ["footer"], window.location, window.setTimeout );