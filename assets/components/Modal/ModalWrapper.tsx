import {Component, createRef} from 'preact';
import {connect} from 'unistore/preact';
import {StoreStateInterface} from '../../types';
import {modalActions, modalType} from '../../actions/modalActions';

interface Properties extends StoreStateInterface {
    type: modalType,
    title: string|null,
    onClose(): void,

    closeModal(type: modalType): void,
}
interface State {}


class ModalWrapper extends Component<Properties, State> {
    wrapperRef = createRef();

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    private handleClickOutside(event: any) {
        if (
            this.wrapperRef.current
            && !this.wrapperRef.current.contains(event.target)
        ) {
            this.closeModal();
        }
    }

    private closeModal() {
        this.props.closeModal(this.props.type);

        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        if (this.props.shownModal !== this.props.type) {
            return;
        }

        return (
            <Component>
                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center flex">
                    <div className="relative w-full h-full max-w-2xl md:h-auto" ref={this.wrapperRef}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                onClick={() => this.closeModal()}
                            >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>

                                <span className="sr-only">Close modal</span>
                            </button>

                            <div className="px-6 py-6 lg:px-8">
                                {this.props.title && <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{this.props.title}</h3>}

                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="opacity-25 fixed inset-0 z-40 bg-black" />
            </Component>
        );
    }
}

export default connect(['shownModal'], modalActions)(ModalWrapper);
