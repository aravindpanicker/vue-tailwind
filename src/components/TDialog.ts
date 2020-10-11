import { CreateElement, VNode } from 'vue';
import Component from '../base/Component';
import Key from '../types/Key';
import TDialogOverlay from './TDialog/TDialogOverlay';
import { DialogInput } from './TDialog/TDialogOverlayWrapperTransitionDialog';
import {
  HideReason, DialogType,
} from '../types/Dialog';

type InitialData = {
  overlayShow: boolean;
  dialogShow: boolean;
  params: undefined;
  preventAction: boolean;
  hideReason: HideReason | null;
  input?: DialogInput;
  resolve: null | ((value?: unknown) => void);
  reject: null | ((reason?: unknown) => void);
}

type DialogResponse = {
  hideReason: HideReason | null;
  isOk: boolean;
  isCancel: boolean;
  isDismissed: boolean;
  input?: DialogInput;
}

type BeforeCloseParams = {
  cancel: () => void;
  event: Event;
  reason: HideReason;
  input: DialogInput;
}

const getInitialData = (): InitialData => ({
  overlayShow: false,
  dialogShow: false,
  params: undefined,
  preventAction: false,
  hideReason: null,
  input: undefined,
  resolve: null,
  reject: null,
});

const TDialog = Component.extend({
  name: 'TDialog',

  props: {
    titleTag: {
      type: String,
      default: 'h3',
    },
    title: {
      type: String,
      default: undefined,
    },
    htmlTitle: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    htmlIcon: {
      type: String,
      default: undefined,
    },
    textTag: {
      type: String,
      default: 'p',
    },
    text: {
      type: String,
      default: undefined,
    },
    htmlText: {
      type: String,
      default: undefined,
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    escToClose: {
      type: Boolean,
      default: true,
    },
    cancelButtonText: {
      type: String,
      default: 'Cancel',
    },
    cancelButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    okButtonText: {
      type: String,
      default: 'OK',
    },
    okButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    showCloseButton: {
      type: Boolean,
      default: false,
    },
    closeButtonHtml: {
      type: String,
      default: '@TODO',
    },
    disableBodyScroll: {
      type: Boolean,
      default: true,
    },
    focusOnOpen: {
      type: Boolean,
      default: true,
    },
    inputAttributes: {
      type: Object,
      default: undefined,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputValidator: {
      type: Function,
      default: undefined,
    },
    inputParser: {
      type: Function,
      default: undefined,
    },
    inputValue: {
      type: [String, Array],
      default: undefined,
    },
    inputOptions: {
      type: [Array, Object],
      default: undefined,
    },
    inputPlaceholder: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: DialogType.Alert,
    },
    fixedClasses: {
      type: Object,
      default() {
        return {
          overlay: 'overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed',
          wrapper: 'relative mx-auto ',
          dialog: 'overflow-hidden relative',

          close: 'absolute right-0 top-0',
          closeIcon: '',
          content: 'mt-3',

          titleWrapper: '',
          title: 'text-lg leading-6 font-medium text-gray-900 text-center',

          textWrapper: 'mt-2 text-gray-600',
          text: '',

          iconWrapper: 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-200',
          icon: 'w-6 h-6 text-gray-700',

          overlayEnterClass: '',
          overlayEnterActiveClass: '',
          overlayEnterToClass: '',
          overlayLeaveClass: '',
          overlayLeaveActiveClass: '',
          overlayLeaveToClass: '',
          enterClass: '',
          enterActiveClass: '',
          enterToClass: '',
          leaveClass: '',
          leaveActiveClass: '',
          leaveToClass: '',
        };
      },
    },
    classes: {
      type: Object,
      default() {
        return {
          close: 'bg-gray-100 flex h-8 items-center justify-center m-1 rounded-full text-gray-700 w-8 hover:bg-gray-200',
          closeIcon: 'h-5 w-5 fill-current',

          overlay: 'z-40 bg-black bg-opacity-50',
          wrapper: 'z-50 max-w-md',
          dialog: 'bg-white rounded p-4 text-left overflow-hidden shadow ',

          body: '',
          buttons: 'mt-4 flex space-x-4 justify-center',

          iconWrapper: '',
          icon: '',
          content: '',

          titleWrapper: '',
          title: '',

          textWrapper: '',
          text: '',

          cancelButton: 'inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 w-full',
          okButton: 'inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 w-full',

          inputWrapper: 'mt-3 flex items-center space-x-4 justify-center',

          input: 'form-input w-full',
          select: 'form-select w-full',

          radioWrapper: 'flex items-center space-x-2',
          radio: 'form-radio',
          radioText: '',

          checkboxWrapper: 'flex items-center space-x-2',
          checkbox: 'form-checkbox',
          checkboxText: '',

          errorMessage: 'text-red-500 block text-sm',

          busyWrapper: 'absolute bg-opacity-50 bg-white flex h-full items-center justify-center left-0 top-0 w-full',
          busyIcon: 'animate-spin h-6 w-6 fill-current text-gray-500',

          overlayEnterClass: '',
          overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
          overlayEnterToClass: 'opacity-100',
          overlayLeaveClass: 'transition ease-in opacity-100',
          overlayLeaveActiveClass: '',
          overlayLeaveToClass: 'opacity-0 duration-75',

          enterClass: '',
          enterActiveClass: '',
          enterToClass: '',
          leaveClass: '',
          leaveActiveClass: '',
          leaveToClass: '',
        };
      },
    },
  },

  data() {
    return getInitialData();
  },

  watch: {
    async overlayShow(shown) {
      this.$emit('input', shown);
      this.$emit('change', shown);

      if (shown) {
        await this.$nextTick();
        this.dialogShow = true;
      } else {
        this.closed();
      }
    },
    async dialogShow(shown) {
      if (!shown) {
        await this.$nextTick();
        this.overlayShow = false;
      } else {
        this.opened();
      }
    },
  },

  beforeDestroy() {
    const overlay = this.getOverlay();
    if (this.disableBodyScroll && overlay) {
      overlay.focus();
      overlay.enableBodyScroll();
    }
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'transition',
      {
        props: {
          enterClass: this.getElementCssClass('overlayEnterClass'),
          enterActiveClass: this.getElementCssClass('overlayEnterActiveClass'),
          enterToClass: this.getElementCssClass('overlayEnterToClass'),
          leaveClass: this.getElementCssClass('overlayLeaveClass'),
          leaveActiveClass: this.getElementCssClass('overlayLeaveActiveClass'),
          leaveToClass: this.getElementCssClass('overlayLeaveToClass'),
        },
      },
      [
        createElement(
          TDialogOverlay,
          {
            ref: 'overlay',
            props: {
              type: this.type,
              overlayShow: this.overlayShow,
              dialogShow: this.dialogShow,
              titleTag: this.titleTag,
              title: this.title,
              htmlTitle: this.htmlTitle,
              icon: this.icon,
              htmlIcon: this.htmlIcon,
              textTag: this.textTag,
              text: this.text,
              htmlText: this.htmlText,
              cancelButtonText: this.cancelButtonText,
              cancelButtonAriaLabel: this.cancelButtonAriaLabel,
              okButtonText: this.okButtonText,
              okButtonAriaLabel: this.okButtonAriaLabel,
              showCloseButton: this.showCloseButton,
              closeButtonHtml: this.closeButtonHtml,
              inputAttributes: this.inputAttributes,
              inputType: this.inputType,
              inputValidator: this.inputValidator,
              inputParser: this.inputParser,
              inputValue: this.inputValue,
              inputOptions: this.inputOptions,
              inputPlaceholder: this.inputPlaceholder,
              getElementCssClass: this.getElementCssClass,
            },
            on: {
              outsideClick: this.outsideClick,
              keyup: this.keyupHandler,
              dismiss: (e: MouseEvent, reason: HideReason) => this.dismiss(e, reason),
              cancel: (e: MouseEvent, reason: HideReason) => this.cancel(e, reason),
              submit: (e: MouseEvent, reason: HideReason, input: DialogInput) => this.submit(e, reason, input),
            },
          },
        ),
      ],
    );
  },

  methods: {
    getOverlay() {
      return this.$refs.overlay as unknown as {
        focus: () => void,
        enableBodyScroll: () => void,
        disableBodyScroll: () => void,
      } | undefined;
    },
    keyupHandler(e: KeyboardEvent) {
      if (e.keyCode === Key.ESC && this.escToClose) {
        this.dismiss(e, HideReason.Esc);
      }
    },
    beforeOpen() {
      this.$emit('before-open', { params: this.params, cancel: this.closeCancel });
    },
    opened() {
      this.$emit('opened', { params: this.params });
      this.prepareDomForDialog();
    },
    beforeClose(event: Event, reason: HideReason, input?: DialogInput) {
      if (this.disableBodyScroll) {
        const overlay = this.getOverlay();
        if (overlay) {
          overlay.focus();
          overlay.enableBodyScroll();
        }
      }

      const beforeCloseParams: Partial<BeforeCloseParams> = {
        cancel: this.closeCancel,
        event,
        reason,
      };

      if (input !== undefined) {
        beforeCloseParams.input = input;
      }

      this.$emit('before-close', beforeCloseParams);
    },
    closed() {
      const response: Partial<DialogResponse> = {
        hideReason: this.hideReason,
        isOk: this.hideReason === HideReason.Ok,
        isCancel: this.hideReason === HideReason.Cancel,
        isDismissed: typeof this.hideReason === 'string' && [HideReason.Close, HideReason.Esc, HideReason.Outside].includes(this.hideReason),
      };

      if (this.type === DialogType.Prompt && this.hideReason === HideReason.Ok && this.input !== undefined) {
        response.input = this.input;
      }

      this.$emit('closed', response);

      if (this.resolve) {
        this.resolve(response);
      }

      this.reset();
    },
    prepareDomForDialog() {
      const overlay = this.getOverlay();
      if (!overlay) {
        return;
      }

      if (this.disableBodyScroll) {
        overlay.disableBodyScroll();
      }

      if (this.focusOnOpen) {
        overlay.focus();
      }
    },
    dismiss(e: Event, reason: HideReason) {
      this.close(e, reason);
    },
    cancel(e: Event, reason: HideReason) {
      this.close(e, reason);
    },
    submit(e: Event, reason: HideReason, input: DialogInput) {
      this.close(e, reason, input);
    },
    close(e: Event, reason: HideReason, input?: DialogInput) {
      this.beforeClose(e, reason, input);

      this.hideReason = reason;
      this.input = input;

      if (!this.preventAction) {
        this.dialogShow = false;
      } else {
        this.preventAction = false;
      }
    },
    show(params = undefined) {
      this.params = params;

      this.beforeOpen();

      if (!this.preventAction) {
        this.overlayShow = true;
      } else {
        this.preventAction = false;
      }
    },
    closeCancel() {
      this.preventAction = true;
    },
    reset() {
      Object.assign(this.$data, getInitialData());
    },
    outsideClick(e: Event) {
      if (this.clickToClose) {
        this.dismiss(e, HideReason.Outside);
      }
    },
  },
});

export default TDialog;
