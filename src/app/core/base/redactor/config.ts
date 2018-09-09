export interface RedactorAutoSaveFields {
    [key: string]: any
}

export interface RedactorCallbacks {
    [action: string]: Function
}

export interface RedactorFormatting {
    title: string
    args: Array<string>
}

export interface RedactorFormattingAdd {
    [key: string]: RedactorFormatting
}

export interface RedactorShortcut {
    func: string
    params: Array<string>
}

export interface RedactorShortcutAdd {
    [keyCombine: string]: RedactorShortcut
}

export interface RedactorConfig {
    /** Air toolbar */
    air?: boolean
    airWidth?: string

    /** Auto save options */
    /** api endpoint to call when save WIP document */
    autoSave?: string
    autosaveName?: string
    autosaveFields?: RedactorAutoSaveFields

    /**
     * button to show on toolbar
     */
    buttons?: Array<string>
    buttonsHide?: Array<string>
    buttonsHideOnMobile?: Array<string>

    /**
     * allowing users to click on an area to invoke Redactor.
     * It is required that Redactor is being initialized over a div and not over a textarea.
     */
    clickToEdit?: boolean
    /**
     * element selector
     */
    clickToCancel?: string
    clickToSave?: string
    /** accept save and cancel callbacks */
    callbacks?: RedactorCallbacks

    /**
     * File Uploading
     *
     * fileUpload is api endpoint for uploading file.
     * This api must return a JSON Object contain `id`, `name` and `url` fields.
     */
    fileUpload?: string
    /** key to send file data. Eg: formData.append(thiskey, file) */
    fileUploadParam?: string
    dragFileUpload?: boolean

    /** auto focus after initiated */
    focus?: boolean
    /** set caret after last character */
    focusEnd?: boolean

    /** list of available element in format dropdown */
    formatting?: Array<string>
    formattingAdd?: RedactorFormattingAdd

    /** in pixel */
    minHeight?: string
    maxHeight?: string

    /** Image upload config */
    /** uploading endpoint. This return { id, url } */
    imageUpload?: string
    /** name of the field will contain file */
    imageUploadParam?: string
    dragImageUpload?: boolean
    /** selector of the form can be upload with the image */
    imageUploadForms?: string
    /** selector of the input can be upload with the image */
    imageUploadFields?: string
    clipboardImageUpload?: boolean
    imageCaption?: boolean
    imageResizable?: boolean
    /** allow to set image position. False by default */
    imagePosition?: boolean
    /** default to 10px */
    imageFloatMargin?: string
    /** default to figure */
    imageTag?: string

    /** Keypress?: toggle the use of some key */
    enterKey?: boolean
    tabKey?: boolean
    /** number of space represent a tab */
    tabAsSpaces?: number | boolean
    /** Behaviour when user press tab in a preformatted block */
    preSpaces?: number | boolean

    lang?: string
    direction?: string

    linkNofollow?: boolean
    /** link text truncate size */
    linkSize?: number
    linkTooltip?: boolean
    /** Auto convert link-like text to link, and media link to embedded media */
    linkify?: boolean
    linkNewTab?: boolean

    /** eg: _blank */
    pasteLinkTarget?: string
    pastePlainText?: boolean
    pasteImages?: boolean
    pasteLinks?: boolean
    pasteBlockTags?: Array<string>
    pasteInlineTags?: Array<string>

    placeholder?: string
    shortcuts?: boolean
    shortcutsAdd?: RedactorShortcutAdd

    /** Toolbar */
    toolbarFixedTopOffset?: number
    toolbar?: boolean
    toolbarExternal?: string | boolean
    toolbarFixed?: boolean
    toolbarFixedTarget?: string
    toolbarOverflow?: boolean

    maxWidth?: string

    /** Specials */
    /** amazon S3 file upload */
    s3?: boolean | string
    tabindex?: number
    plugins?: Array<string>
    script?: boolean
    structure?: boolean
    preClass?: string
    removeComments?: boolean
    animation?: boolean
    videoContainerClass?: string
    replaceTags?: boolean | {
        [key: string]: string
    }
    spellcheck?: boolean
    overrideStyles?: boolean
}
