const events = {

    INIT_DOMGL: 'init_DomGL',
    INIT_DOMGL_PROJECTS: 'init_DOMGL_projects',
    INIT_DOMGL_ABOUT: 'init_DOMGL_about',
    QUADS_LOADED: 'quads_loaded',
    SWAP_QUAD: 'swap_quad',

    PREPARE_UNMOUNT: 'prepare_unmount',
    REMOVE_DOMGL: 'remove_DOMGL',
    REMOVE_DOMGL_PROJECTS: 'remove_DOMGL_projects',
    REMOVE_DOMGL_ABOUT: 'remove_DOMGL_about',
    LOAD_PROJECT_CONTENT: 'load_Project_Content',

    ENTER_SCROLL_MODE: 'enter_scroll_mode',
    EXIT_SCROLL_MODE: 'exit_scroll_mode',
    APPLY_SCROLL_MODE_ANIM: 'apply_scroll_mode_anim',
    REMOVE_SCROLL_MODE_ANIM: 'remove_scroll_mode_anim',

    MOUSE_DOWN: 'mouse_down',
    MOUSE_MOVE: 'mouse_move',
    MOUSE_UP: 'mouse_up',

    SCROLLING: 'scrolling',

    TOUCH_START: 'touch_start',
    TOUCH_MOVE: 'touch_move',
    TOUCH_END: 'touch_end',

    UPDATE: 'update',
    UPDATE_SCROLL_PHASE: 'update_scroll_phase',

    HOVERING_LINK: 'hovering_link',
    LEAVING_LINK: 'leaving_link',
    
    REPLACE_QUAD: 'replace_quad',

    PLAY_VIDEO: 'play_video',
    PAUSE_VIDEO: 'pause_video',

    SHOW_CLICKDRAG_CTA: 'show_click-drag_cta',
    HIDE_CLICKDRAG_CTA: 'hide_click-drag_cta',
    
    RESIZE: 'resize'

}

export default events;