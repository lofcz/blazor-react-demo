export async function Init(pars = {
    id: "",
    net: {},
    defaultContent: ""
}) {
    window[`reactEditor_${pars.id}`] = {
        ignoreEvents: false,
        editor: null,
        net: pars.net,
        setValue: (val) => {
            if (window[`reactEditor_${pars.id}`].editor) {
                window[`reactEditor_${pars.id}`].ignoreEvents = true;
                window[`reactEditor_${pars.id}`].editor.setContent(val);
                window[`reactEditor_${pars.id}`].ignoreEvents = false;
            }
        },
        dispose: () => {
            window[`reactEditor_${pars.id}`].editor?.destroy();
            window[`reactEditor_${pars.id}`] = null;
            delete window[`reactEditor_${pars.id}`];
        } 
    };

    await Promise.all([
        mcf.requireCssAsync("tiptapIsland"),
        mcf.requireLibAsync("react,reactDom,tiptapIsland")
    ]);

    window[`reactEditor_${pars.id}`].editor = window["TipTapIsland"].create(pars.id, {
        content: pars.defaultContent,
        onUpdate: (html) => {
            if (!window[`reactEditor_${pars.id}`].ignoreEvents) {
                window[`reactEditor_${pars.id}`].net["invokeMethodAsync"]('JsContentChanged', html);
            }
        }
    });
}

export function SetContent(pars = {
    id: "",
    content: ""
}) {
    if (window[`reactEditor_${pars.id}`]) {
        window[`reactEditor_${pars.id}`].setValue(pars.content);
    }
}

export function Dispose(pars = {
    id: ""
}) {
    if (window[`reactEditor_${pars.id}`]) {
        window[`reactEditor_${pars.id}`].dispose();
    }
}