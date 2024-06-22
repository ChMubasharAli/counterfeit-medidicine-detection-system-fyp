'use client'
import React, { useState } from "react";
import Drawer from "./Drawer";
const ButtonPage = ({ distributerData }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };


    return (
        <div>
            <div className="flex justify-center items-center">
                <button
                    onClick={openDrawer}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Show Manufacturer Data
                </button>
                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={closeDrawer}
                    distributerData={distributerData}
                />
            </div>
        </div>
    );
};

export default ButtonPage