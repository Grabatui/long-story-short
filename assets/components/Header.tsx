import {Match} from 'preact-router/match';
import {Component, h} from 'preact';
import XMarkIcon from "./Icon/XMarkIcon";
import Bars3Icon from "./Icon/Bars3Icon";
import {classNames} from "../helpers";
import OutsideClickWrapper from "./Wrapper/OutsideClickWrapper";


type Properties = {};
type State = {
    isMainMenuOpen: boolean,
    isProfileMenuOpen: boolean
};

type LinkItem = {
    url: string,
    text: string
};
type MatchItem = {
    matches: boolean,
    path: string,
    url: string
};


const LINKS: LinkItem[] = [
    {
        url: '/',
        text: 'Главная',
    },
    {
        url: '/series',
        text: 'Сериалы',
    },
];


export default class Header extends Component<Properties, State> {
    constructor(properties: Properties) {
        super(properties);

        this.state = {
            isMainMenuOpen: false,
            isProfileMenuOpen: false,
        };
    }

    render() {
        return (
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={() => this.setState({isMainMenuOpen: !this.state.isMainMenuOpen})}
                            >
                                <span className="sr-only">Open main menu</span>

                                {this.state.isMainMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
                            </button>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <a href="/">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                    <img
                                        className="hidden h-8 w-auto lg:block"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                </div>
                            </a>

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {LINKS.map((link: LinkItem) => (
                                        <Match path={link.url}>{(match: MatchItem) => (
                                            <a
                                                className={
                                                    match.matches
                                                        ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                                }
                                                href={link.url}
                                            >{link.text}</a>
                                        )}</Match>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative ml-3">

                                <OutsideClickWrapper onOutsideClick={() => this.setState({isProfileMenuOpen: false})}>
                                    <div>
                                        <button
                                            className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            onClick={() => this.setState({isProfileMenuOpen: !this.state.isProfileMenuOpen})}
                                        >
                                            <span className="sr-only">Open user menu</span>

                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </button>
                                    </div>

                                    <div
                                        className={classNames([
                                            'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                                            this.state.isProfileMenuOpen ? null : 'hidden'
                                        ])}
                                    >
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                                    </div>
                                </OutsideClickWrapper>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classNames(['sm:hidden', !this.state.isMainMenuOpen ? 'hidden' : null])} id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {LINKS.map((link: LinkItem) => (
                            <Match path={link.url}>{(match: MatchItem) => (
                                <a
                                    className={
                                        match.matches
                                            ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                    }
                                    href={link.url}
                                >{link.text}</a>
                            )}</Match>
                        ))}
                    </div>
                </div>
            </nav>
        );
    }
}