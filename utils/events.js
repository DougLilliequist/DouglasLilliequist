const events = {

    INIT_DOMGL: 'init_DomGL',
    QUADS_LOADED: 'quads_loaded',
    RESET_QUADS: 'reset_quad',
    REVEAL_QUADS: 'reveal_quads',

    PREPARE_UNMOUNT: 'prepare_unmount',
    TRANSITIONING: 'transitioning',
    REMOVE_DOMGL: 'remove_DOMGL',
    LOAD_PROJECT_CONTENT: 'load_Project_Content',

    CONTENT_LOADED: 'content_loaded',
    UPDATE_PROGRESS: 'update_progress',
    LOADING_ANIM_COMPLETED: 'loading_anim_completed',
    TEXTURE_LOADED: 'texture_loaded',
    UPDATE_CONTENT_COUNT: 'update_content_count',

    ENTER_SCROLL_MODE: 'enter_scroll_mode',
    EXIT_SCROLL_MODE: 'exit_scroll_mode',
    APPLY_SCROLL_MODE_ANIM: 'apply_scroll_mode_anim',
    REMOVE_SCROLL_MODE_ANIM: 'remove_scroll_mode_anim',
    UPDATE_VIEWMODE: 'update_view_mode',

    SHOW_PROJECT: 'show_project',
    CLOSE_PROJECT: 'close_project',

    MOUSE_DOWN: 'mouse_down',
    MOUSE_MOVE: 'mouse_move',
    MOUSE_UP: 'mouse_up',

    TOUCH_START: 'touch_start',
    TOUCH_MOVE: 'touch_move',
    TOUCH_END: 'touch_end',
    TOUCH_CANCEL: 'touch_cancel',

    TOUCH_START: 'touch_start',
    TOUCH_MOVE: 'touch_move',
    TOUCH_END: 'touch_end',

    UPDATE: 'update',

    HOVERING_STICKY_COMPONENT: 'hovering_sticky_component',
    LEAVING_STICKY_COMPONENT: 'leaving_sticky_component',
    UPDATE_STICKY_TARGET: 'update_sticky_target',

    HOVERING_NAV_LINK: 'hovering_nav_link',

    HOVERING_LINK: 'hovering_link',
    LEAVING_LINK: 'leaving_link',
    LINK_SELECTED: 'link_selected',

    PLAY_VIDEO: 'play_video',
    PAUSE_VIDEO: 'pause_video',

    SHOW_CLICKDRAG_CTA: 'show_click-drag_cta',
    HIDE_CLICKDRAG_CTA: 'hide_click-drag_cta',

    RESIZE: 'resize'

}

export default events;