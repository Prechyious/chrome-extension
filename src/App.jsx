import logo from "./assets/logo.svg";
import monitor from "./assets/monitor.svg";
import tab from "./assets/copy.svg";
import { IoSettingsOutline, IoVideocamOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { useState } from "react";

const App = () => {
    const [camToggled, setCamToggled] = useState(true);
    const [audioToggled, setAudioToggled] = useState(true);

    const startRecording = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "request_recording" },
                (res) => {
                    if (!chrome.runtime.lastError) {
                        console.log(res);
                    } else {
                        console.log(chrome.runtime.lastError);
                    }
                }
            );
        });
    };

    const stopRecording = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "stop_recording" },
                (res) => {
                    if (!chrome.runtime.lastError) {
                        console.log(res);
                    } else {
                        console.log(chrome.runtime.lastError);
                    }
                }
            );
        });
    };

    return (
        <div className="pt-6 px-6 pb-8 max-w-xs shadow-[0_4px_20px_0px_rgba(0,0,0,0.10)] rounded-3xl">
            <div className="flex gap-[4.25rem] items-center">
                <div className="flex gap-2 items-center text-primary">
                    <img className="w-7 h-7" src={logo} alt="HelpMeOut" />
                    <h1 className="font-sora text-base font-bold">HelpMeOut</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button>
                        <IoSettingsOutline className="text-primary h-5 w-5" />
                    </button>
                    <button>
                        <IoCloseCircleOutline className="text-[#B6B3C6] h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <p className="font-workSans text-sm font-normal leading-normal text-primaryLight max-w-[15.75rem]">
                    This extension helps you record and share help videos with
                    ease.
                </p>
            </div>
            <div className="mt-8 flex items-center justify-around">
                <div className="flex flex-col items-center">
                    <img className="w-8 h-8" src={monitor} alt="monitor" />
                    <p className="font-workSans text-sm font-medium leading-normal text-[#928FAB]">
                        Full screen
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <img className="w-8 h-8" src={tab} alt="current tab" />
                    <p className="font-workSans text-sm font-semibold text-primary leading-normal">
                        Current Tab
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-6">
                <div className="flex items-center justify-between px-4 py-3 border border-[#100A42] rounded-xl">
                    <div className="flex items-center gap-2">
                        <IoVideocamOutline className="h-6 w-6 text-[#0F172A]" />
                        <p className="text-[#100A42] font-workSans text-sm font-medium leading-normal">
                            Camera
                        </p>
                    </div>
                    <button
                        onClick={() => setCamToggled(!camToggled)}
                        className="w-9 h-5 p-[0.125rem] bg-primary rounded-xl relative"
                    >
                        <div
                            className={`absolute w-4 h-4 rounded-full bg-white top-0.5 ${
                                camToggled ? "right-0.5" : "right-[1.1rem]"
                            } transition-all duration-300 ease-in-out`}
                        ></div>
                    </button>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border border-[#100A42] rounded-xl">
                    <div className="flex items-center gap-2">
                        <HiOutlineMicrophone className="h-6 w-6 text-[#0F172A]" />
                        <p className="text-[#100A42] font-workSans text-sm font-medium leading-normal">
                            Audio
                        </p>
                    </div>
                    <button
                        onClick={() => setAudioToggled(!audioToggled)}
                        className="w-9 h-5 p-[0.125rem] bg-primary rounded-xl relative"
                    >
                        <div
                            className={`absolute w-4 h-4 rounded-full bg-white top-0.5 ${
                                audioToggled ? "right-0.5" : "right-[1.1rem]"
                            } transition-all duration-300 ease-in-out`}
                        ></div>
                    </button>
                </div>
            </div>
            <div className="mt-6">
                {status === "recording" ? (
                    <button
                        onClick={stopRecording}
                        className="p-4 bg-primary rounded-xl text-[#FAFDFF] font-workSans text-base font-medium leading-normal w-full"
                    >
                        Stop Recording
                    </button>
                ) : (
                    <button
                        onClick={startRecording}
                        className="p-4 bg-primary rounded-xl text-[#FAFDFF] font-workSans text-base font-medium leading-normal w-full"
                    >
                        Start Recording
                    </button>
                )}
            </div>
        </div>
    );
};

export default App;
