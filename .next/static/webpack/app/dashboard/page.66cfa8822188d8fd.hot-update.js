"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./componentes/companySumary.tsx":
/*!***************************************!*\
  !*** ./componentes/companySumary.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CompanySumary; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var primereact_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primereact/button */ \"(app-pages-browser)/./node_modules/primereact/button/button.esm.js\");\n/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primereact/datatable */ \"(app-pages-browser)/./node_modules/primereact/datatable/datatable.esm.js\");\n/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primereact/column */ \"(app-pages-browser)/./node_modules/primereact/column/column.esm.js\");\n/* harmony import */ var primereact_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primereact/dialog */ \"(app-pages-browser)/./node_modules/primereact/dialog/dialog.esm.js\");\n/* harmony import */ var primereact_inputtext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primereact/inputtext */ \"(app-pages-browser)/./node_modules/primereact/inputtext/inputtext.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction CompanySumary() {\n    _s();\n    const [companies, setCompanies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [selectedCompany, setSelectedCompany] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [editDialogVisible, setEditDialogVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isEditMode, setIsEditMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // Abrir modal para crear o editar\n    const openDialog = function() {\n        let companyToEdit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;\n        setIsEditMode(!!companyToEdit);\n        setSelectedCompany(companyToEdit || {\n            _id: \"\",\n            companyCode: \"\",\n            companyName: \"\",\n            nit: \"\",\n            address: \"\",\n            legalRepresentative: \"\",\n            phone: \"\",\n            createdAt: new Date()\n        });\n        setEditDialogVisible(true);\n        console.log(selectedCompany);\n    };\n    // Guardar los cambios\n    const saveChanges = ()=>{\n        if (selectedCompany) {\n            // setCompanies((prevCompanies) =>\n            //   prevCompanies.map((comp) =>\n            //     comp._id === selectedCompany._id ? selectedCompany : comp\n            //   )\n            // );\n            if (isEditMode) {\n            /*setCompanies((prevCompanies) =>\n         prevCompanies.map((c) => (c._id === company._id ? company : c))         \n       );*/ } else {\n            /*setCompanies((prevCompanies) => [\n          ...prevCompanies,\n          { ...company, _id: prevCompanies.length + 1 },\n        ]);*/ }\n        }\n        setEditDialogVisible(false);\n    };\n    // Renderizar el botón de editar\n    const actionBodyTemplate = (rowData)=>{\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n            icon: \"pi pi-pencil\",\n            className: \"p-button-rounded p-button-success\",\n            onClick: ()=>openDialog(rowData)\n        }, void 0, false, {\n            fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n            lineNumber: 66,\n            columnNumber: 7\n        }, this);\n    };\n    const fetchCompanies = async ()=>{\n        const token = localStorage.getItem(\"token\");\n        if (!token) {\n            console.error(\"No token found\");\n            return;\n        }\n        try {\n            const response = await fetch(\"/dashboard/companies/api\", {\n                method: \"GET\",\n                headers: {\n                    Authorization: \"Bearer \".concat(token),\n                    \"Content-Type\": \"application/json\"\n                }\n            });\n            if (!response.ok) {\n                throw new Error(\"Failed to fetch companies\");\n            }\n            const data = await response.json();\n            setCompanies(data);\n        } catch (error) {\n            console.error(\"Error fetching companies:\", error);\n        //throw new Error('Failed to fetch companies ');\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchCompanies();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                label: \"Agregar Compa\\xf1\\xeda\",\n                icon: \"pi pi-plus\",\n                onClick: ()=>openDialog(),\n                className: \"p-mb-3\"\n            }, void 0, false, {\n                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                lineNumber: 110,\n                columnNumber: 7\n            }, this),\n            companies.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_datatable__WEBPACK_IMPORTED_MODULE_3__.DataTable, {\n                        value: companies,\n                        paginator: true,\n                        rows: 5,\n                        rowsPerPageOptions: [\n                            5,\n                            10,\n                            25,\n                            50\n                        ],\n                        tableStyle: {\n                            minWidth: \"50rem\"\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_column__WEBPACK_IMPORTED_MODULE_4__.Column, {\n                                field: \"companyName\",\n                                header: \"Company Name\",\n                                style: {\n                                    width: \"25%\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 120,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_column__WEBPACK_IMPORTED_MODULE_4__.Column, {\n                                field: \"legalRepresentative\",\n                                header: \"Legal Representative\",\n                                style: {\n                                    width: \"25%\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 121,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_column__WEBPACK_IMPORTED_MODULE_4__.Column, {\n                                field: \"phone\",\n                                header: \"Phone\",\n                                style: {\n                                    width: \"25%\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 122,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_column__WEBPACK_IMPORTED_MODULE_4__.Column, {\n                                header: \"Editar\",\n                                body: actionBodyTemplate,\n                                style: {\n                                    width: \"25%\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 123,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                        lineNumber: 119,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_dialog__WEBPACK_IMPORTED_MODULE_5__.Dialog, {\n                        header: \"PrimeReact Modal\",\n                        visible: editDialogVisible,\n                        style: {\n                            width: \"50vw\"\n                        },\n                        onHide: ()=>setEditDialogVisible(false),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"field\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                        htmlFor: \"name\",\n                                        children: \"Nombre\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                        lineNumber: 135,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_inputtext__WEBPACK_IMPORTED_MODULE_6__.InputText, {\n                                        id: \"companyName\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                        lineNumber: 136,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 134,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                            lineNumber: 133,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                        lineNumber: 127,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                lineNumber: 118,\n                columnNumber: 9\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: \"No se encontraron compa\\xf1\\xedas.\"\n                    }, void 0, false, {\n                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                        lineNumber: 150,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                        label: \"Click Me\",\n                        icon: \"pi pi-check\",\n                        className: \"p-button-raised p-button-rounded\"\n                    }, void 0, false, {\n                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                        lineNumber: 151,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n        lineNumber: 109,\n        columnNumber: 5\n    }, this);\n}\n_s(CompanySumary, \"at7VOjP8XCtnRWpiU1W/5Y0HZFM=\");\n_c = CompanySumary;\nvar _c;\n$RefreshReg$(_c, \"CompanySumary\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudGVzL2NvbXBhbnlTdW1hcnkudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ21EO0FBRVI7QUFDTTtBQUNOO0FBQ0E7QUFDTTtBQWlCbEMsU0FBU1E7O0lBQ3RCLE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHUiwrQ0FBUUEsQ0FBaUIsRUFBRTtJQUM3RCxNQUFNLENBQUNTLGlCQUFpQkMsbUJBQW1CLEdBQUdWLCtDQUFRQSxDQUFzQjtJQUM1RSxNQUFNLENBQUNXLG1CQUFtQkMscUJBQXFCLEdBQUdaLCtDQUFRQSxDQUFDO0lBQzNELE1BQU0sQ0FBQ2EsWUFBWUMsY0FBYyxHQUFHZCwrQ0FBUUEsQ0FBQztJQUU3QyxrQ0FBa0M7SUFDbEMsTUFBTWUsYUFBYTtZQUFDQyxpRkFBcUM7UUFDdkRGLGNBQWMsQ0FBQyxDQUFDRTtRQUNoQk4sbUJBQW1CTSxpQkFBaUI7WUFBRUMsS0FBSTtZQUFJQyxhQUFZO1lBQUdDLGFBQVk7WUFBSUMsS0FBSTtZQUFJQyxTQUFRO1lBQUdDLHFCQUFvQjtZQUFHQyxPQUFNO1lBQUlDLFdBQVcsSUFBSUM7UUFBTTtRQUN0SmIscUJBQXFCO1FBQ3JCYyxRQUFRQyxHQUFHLENBQUNsQjtJQUNkO0lBRUEsc0JBQXNCO0lBQ3RCLE1BQU1tQixjQUFjO1FBQ2xCLElBQUluQixpQkFBaUI7WUFDbkIsa0NBQWtDO1lBQ2xDLGdDQUFnQztZQUNoQyxnRUFBZ0U7WUFDaEUsTUFBTTtZQUNOLEtBQUs7WUFFTCxJQUFJSSxZQUFZO1lBQ2Q7O1NBRUMsR0FDSCxPQUFPO1lBQ0w7OztXQUdHLEdBQ0w7UUFFRjtRQUNBRCxxQkFBcUI7SUFDdkI7SUFFQSxnQ0FBZ0M7SUFDaEMsTUFBTWlCLHFCQUFxQixDQUFDQztRQUMxQixxQkFDRSw4REFBQzdCLHFEQUFNQTtZQUNMOEIsTUFBSztZQUNMQyxXQUFVO1lBQ1ZDLFNBQVMsSUFBTWxCLFdBQVdlOzs7Ozs7SUFHaEM7SUFFQSxNQUFNSSxpQkFBaUI7UUFDckIsTUFBTUMsUUFBUUMsYUFBYUMsT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQ0YsT0FBTztZQUNWVCxRQUFRWSxLQUFLLENBQUM7WUFDZDtRQUNGO1FBRUEsSUFBSTtZQUNGLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSw0QkFBNEI7Z0JBQ3ZEQyxRQUFRO2dCQUNSQyxTQUFTO29CQUNQQyxlQUFlLFVBQWdCLE9BQU5SO29CQUN6QixnQkFBZ0I7Z0JBQ2xCO1lBQ0Y7WUFFQSxJQUFJLENBQUNJLFNBQVNLLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxJQUFJQyxNQUFNO1lBQ2xCO1lBRUEsTUFBTUMsT0FBTyxNQUFNUCxTQUFTUSxJQUFJO1lBQ2hDdkMsYUFBYXNDO1FBQ2YsRUFBRSxPQUFPUixPQUFPO1lBQ2RaLFFBQVFZLEtBQUssQ0FBQyw2QkFBNkJBO1FBQzNDLGdEQUFnRDtRQUNsRDtJQUNGO0lBRUF2QyxnREFBU0EsQ0FBQztRQUVSbUM7SUFFRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ2M7OzBCQUNDLDhEQUFDL0MscURBQU1BO2dCQUNMZ0QsT0FBTTtnQkFDTmxCLE1BQUs7Z0JBQ0xFLFNBQVMsSUFBTWxCO2dCQUNmaUIsV0FBVTs7Ozs7O1lBR1h6QixVQUFVMkMsTUFBTSxHQUFHLGtCQUNsQiw4REFBQ0Y7O2tDQUNDLDhEQUFDOUMsMkRBQVNBO3dCQUFDaUQsT0FBTzVDO3dCQUFXNkMsU0FBUzt3QkFBQ0MsTUFBTTt3QkFBR0Msb0JBQW9COzRCQUFDOzRCQUFHOzRCQUFJOzRCQUFJO3lCQUFHO3dCQUFFQyxZQUFZOzRCQUFFQyxVQUFVO3dCQUFROzswQ0FDbkgsOERBQUNyRCxxREFBTUE7Z0NBQUNzRCxPQUFNO2dDQUFjQyxRQUFPO2dDQUFlQyxPQUFPO29DQUFFQyxPQUFPO2dDQUFNOzs7Ozs7MENBQ3hFLDhEQUFDekQscURBQU1BO2dDQUFDc0QsT0FBTTtnQ0FBc0JDLFFBQU87Z0NBQXVCQyxPQUFPO29DQUFFQyxPQUFPO2dDQUFNOzs7Ozs7MENBQ3hGLDhEQUFDekQscURBQU1BO2dDQUFDc0QsT0FBTTtnQ0FBUUMsUUFBTztnQ0FBUUMsT0FBTztvQ0FBRUMsT0FBTztnQ0FBTTs7Ozs7OzBDQUMzRCw4REFBQ3pELHFEQUFNQTtnQ0FBQ3VELFFBQU87Z0NBQVNHLE1BQU1oQztnQ0FBb0I4QixPQUFPO29DQUFFQyxPQUFPO2dDQUFNOzs7Ozs7Ozs7Ozs7a0NBSTFFLDhEQUFDeEQscURBQU1BO3dCQUNMc0QsUUFBTzt3QkFDUEksU0FBU25EO3dCQUNUZ0QsT0FBTzs0QkFBRUMsT0FBTzt3QkFBTzt3QkFDdkJHLFFBQVEsSUFBTW5ELHFCQUFxQjtrQ0FFbkMsNEVBQUNvQztzQ0FDRCw0RUFBQ0E7Z0NBQUloQixXQUFVOztrREFDYiw4REFBQ2lCO3dDQUFNZSxTQUFRO2tEQUFPOzs7Ozs7a0RBQ3RCLDhEQUFDM0QsMkRBQVNBO3dDQUNSNEQsSUFBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQVlYOztrQ0FDRSw4REFBQ0M7a0NBQUU7Ozs7OztrQ0FDSCw4REFBQ2pFLHFEQUFNQTt3QkFBQ2dELE9BQU07d0JBQVdsQixNQUFLO3dCQUFjQyxXQUFVOzs7Ozs7Ozs7Ozs7OztBQVVoRTtHQXhJd0IxQjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRlcy9jb21wYW55U3VtYXJ5LnRzeD9kNGM4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzL3NpZGVCYXJTdHlsZXMubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICdwcmltZXJlYWN0L2J1dHRvbic7XG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tICdwcmltZXJlYWN0L2RhdGF0YWJsZSc7XG5pbXBvcnQgeyBDb2x1bW4gfSBmcm9tICdwcmltZXJlYWN0L2NvbHVtbic7XG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICdwcmltZXJlYWN0L2RpYWxvZyc7XG5pbXBvcnQgeyBJbnB1dFRleHQgfSBmcm9tICdwcmltZXJlYWN0L2lucHV0dGV4dCc7XG4vL1xuaW1wb3J0IGNvbXBhbmlBcGkgZnJvbSAnLi4vYXBwL2FjdGlvbnMvY29tcGFueS1BY3Rpb25zJztcbmltcG9ydCB7IG5vdyB9IGZyb20gJ21vbmdvb3NlJztcblxudHlwZSBDb21wYW55UHJvcHMgPXtcbiAgX2lkOiBzdHJpbmc7XG4gIGNvbXBhbnlDb2RlOiBzdHJpbmc7XG4gIGNvbXBhbnlOYW1lOiBzdHJpbmc7XG4gIG5pdDogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGxlZ2FsUmVwcmVzZW50YXRpdmU6IHN0cmluZztcbiAgcGhvbmU6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBhbnlTdW1hcnkoKSB7XG4gIGNvbnN0IFtjb21wYW5pZXMsIHNldENvbXBhbmllc10gPSB1c2VTdGF0ZTxDb21wYW55UHJvcHNbXT4oW10pO1xuICBjb25zdCBbc2VsZWN0ZWRDb21wYW55LCBzZXRTZWxlY3RlZENvbXBhbnldID0gdXNlU3RhdGU8Q29tcGFueVByb3BzIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtlZGl0RGlhbG9nVmlzaWJsZSwgc2V0RWRpdERpYWxvZ1Zpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNFZGl0TW9kZSwgc2V0SXNFZGl0TW9kZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gQWJyaXIgbW9kYWwgcGFyYSBjcmVhciBvIGVkaXRhclxuICBjb25zdCBvcGVuRGlhbG9nID0gKGNvbXBhbnlUb0VkaXQ6IENvbXBhbnlQcm9wcyB8IG51bGwgPSBudWxsKSA9PiB7XG4gICAgc2V0SXNFZGl0TW9kZSghIWNvbXBhbnlUb0VkaXQpO1xuICAgIHNldFNlbGVjdGVkQ29tcGFueShjb21wYW55VG9FZGl0IHx8IHsgX2lkOicnLCBjb21wYW55Q29kZTonJyxjb21wYW55TmFtZTonJywgbml0OicnLCBhZGRyZXNzOicnLGxlZ2FsUmVwcmVzZW50YXRpdmU6JycscGhvbmU6JycsIGNyZWF0ZWRBdDogbmV3IERhdGUoKX0pO1xuICAgIHNldEVkaXREaWFsb2dWaXNpYmxlKHRydWUpO1xuICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkQ29tcGFueSlcbiAgfTtcblxuICAvLyBHdWFyZGFyIGxvcyBjYW1iaW9zXG4gIGNvbnN0IHNhdmVDaGFuZ2VzID0gKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZENvbXBhbnkpIHtcbiAgICAgIC8vIHNldENvbXBhbmllcygocHJldkNvbXBhbmllcykgPT5cbiAgICAgIC8vICAgcHJldkNvbXBhbmllcy5tYXAoKGNvbXApID0+XG4gICAgICAvLyAgICAgY29tcC5faWQgPT09IHNlbGVjdGVkQ29tcGFueS5faWQgPyBzZWxlY3RlZENvbXBhbnkgOiBjb21wXG4gICAgICAvLyAgIClcbiAgICAgIC8vICk7XG5cbiAgICAgIGlmIChpc0VkaXRNb2RlKSB7XG4gICAgICAgIC8qc2V0Q29tcGFuaWVzKChwcmV2Q29tcGFuaWVzKSA9PlxuICAgICAgICAgcHJldkNvbXBhbmllcy5tYXAoKGMpID0+IChjLl9pZCA9PT0gY29tcGFueS5faWQgPyBjb21wYW55IDogYykpICAgICAgICAgXG4gICAgICAgKTsqL1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLypzZXRDb21wYW5pZXMoKHByZXZDb21wYW5pZXMpID0+IFtcbiAgICAgICAgICAuLi5wcmV2Q29tcGFuaWVzLFxuICAgICAgICAgIHsgLi4uY29tcGFueSwgX2lkOiBwcmV2Q29tcGFuaWVzLmxlbmd0aCArIDEgfSxcbiAgICAgICAgXSk7Ki9cbiAgICAgIH1cblxuICAgIH1cbiAgICBzZXRFZGl0RGlhbG9nVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgLy8gUmVuZGVyaXphciBlbCBib3TDs24gZGUgZWRpdGFyXG4gIGNvbnN0IGFjdGlvbkJvZHlUZW1wbGF0ZSA9IChyb3dEYXRhOiBDb21wYW55UHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJ1dHRvblxuICAgICAgICBpY29uPVwicGkgcGktcGVuY2lsXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicC1idXR0b24tcm91bmRlZCBwLWJ1dHRvbi1zdWNjZXNzXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb3BlbkRpYWxvZyhyb3dEYXRhKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBmZXRjaENvbXBhbmllcyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHRva2VuIGZvdW5kJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9kYXNoYm9hcmQvY29tcGFuaWVzL2FwaScsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBjb21wYW5pZXMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHNldENvbXBhbmllcyhkYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgY29tcGFuaWVzOicsIGVycm9yKTtcbiAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggY29tcGFuaWVzICcpO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgZmV0Y2hDb21wYW5pZXMoKTtcblxuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEJ1dHRvblxuICAgICAgICBsYWJlbD1cIkFncmVnYXIgQ29tcGHDscOtYVwiXG4gICAgICAgIGljb249XCJwaSBwaS1wbHVzXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gb3BlbkRpYWxvZygpfVxuICAgICAgICBjbGFzc05hbWU9XCJwLW1iLTNcIlxuICAgICAgLz5cblxuICAgICAge2NvbXBhbmllcy5sZW5ndGggPiAwID8gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxEYXRhVGFibGUgdmFsdWU9e2NvbXBhbmllc30gcGFnaW5hdG9yIHJvd3M9ezV9IHJvd3NQZXJQYWdlT3B0aW9ucz17WzUsIDEwLCAyNSwgNTBdfSB0YWJsZVN0eWxlPXt7IG1pbldpZHRoOiAnNTByZW0nIH19PlxuICAgICAgICAgICAgPENvbHVtbiBmaWVsZD1cImNvbXBhbnlOYW1lXCIgaGVhZGVyPVwiQ29tcGFueSBOYW1lXCIgc3R5bGU9e3sgd2lkdGg6ICcyNSUnIH19PjwvQ29sdW1uPlxuICAgICAgICAgICAgPENvbHVtbiBmaWVsZD1cImxlZ2FsUmVwcmVzZW50YXRpdmVcIiBoZWFkZXI9XCJMZWdhbCBSZXByZXNlbnRhdGl2ZVwiIHN0eWxlPXt7IHdpZHRoOiAnMjUlJyB9fT48L0NvbHVtbj5cbiAgICAgICAgICAgIDxDb2x1bW4gZmllbGQ9XCJwaG9uZVwiIGhlYWRlcj1cIlBob25lXCIgc3R5bGU9e3sgd2lkdGg6ICcyNSUnIH19PjwvQ29sdW1uPlxuICAgICAgICAgICAgPENvbHVtbiBoZWFkZXI9XCJFZGl0YXJcIiBib2R5PXthY3Rpb25Cb2R5VGVtcGxhdGV9IHN0eWxlPXt7IHdpZHRoOiAnMjUlJyB9fT48L0NvbHVtbj5cbiAgICAgICAgICA8L0RhdGFUYWJsZT5cblxuICAgICAgICAgIHsvKiBWZW50YW5hIE1vZGFsICovfVxuICAgICAgICAgIDxEaWFsb2dcbiAgICAgICAgICAgIGhlYWRlcj1cIlByaW1lUmVhY3QgTW9kYWxcIlxuICAgICAgICAgICAgdmlzaWJsZT17ZWRpdERpYWxvZ1Zpc2libGV9XG4gICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzUwdncnIH19XG4gICAgICAgICAgICBvbkhpZGU9eygpID0+IHNldEVkaXREaWFsb2dWaXNpYmxlKGZhbHNlKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZFwiPlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cIm5hbWVcIj5Ob21icmU8L2xhYmVsPlxuICAgICAgICAgICAgICA8SW5wdXRUZXh0XG4gICAgICAgICAgICAgICAgaWQ9XCJjb21wYW55TmFtZVwiXG4gICAgICAgICAgICAgICAgLy92YWx1ZT17c2VsZWN0ZWRDb21wYW55LmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICAgIC8vb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWxlY3RlZENvbXBhbnkoeyAuLi5zZWxlY3RlZENvbXBhbnksIGNvbXBhbnlOYW1lOmUudGFyZ2V0LnZhbHVlICB9KX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9EaWFsb2c+XG5cblxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8cD5ObyBzZSBlbmNvbnRyYXJvbiBjb21wYcOxw61hcy48L3A+XG4gICAgICAgICAgPEJ1dHRvbiBsYWJlbD1cIkNsaWNrIE1lXCIgaWNvbj1cInBpIHBpLWNoZWNrXCIgY2xhc3NOYW1lPVwicC1idXR0b24tcmFpc2VkIHAtYnV0dG9uLXJvdW5kZWRcIiAvPlxuICAgICAgICA8Lz5cbiAgICAgIClcbiAgICAgIH1cbiAgICA8L2RpdiA+XG4gICk7XG5cblxuXG5cbn1cblxuXG5cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQnV0dG9uIiwiRGF0YVRhYmxlIiwiQ29sdW1uIiwiRGlhbG9nIiwiSW5wdXRUZXh0IiwiQ29tcGFueVN1bWFyeSIsImNvbXBhbmllcyIsInNldENvbXBhbmllcyIsInNlbGVjdGVkQ29tcGFueSIsInNldFNlbGVjdGVkQ29tcGFueSIsImVkaXREaWFsb2dWaXNpYmxlIiwic2V0RWRpdERpYWxvZ1Zpc2libGUiLCJpc0VkaXRNb2RlIiwic2V0SXNFZGl0TW9kZSIsIm9wZW5EaWFsb2ciLCJjb21wYW55VG9FZGl0IiwiX2lkIiwiY29tcGFueUNvZGUiLCJjb21wYW55TmFtZSIsIm5pdCIsImFkZHJlc3MiLCJsZWdhbFJlcHJlc2VudGF0aXZlIiwicGhvbmUiLCJjcmVhdGVkQXQiLCJEYXRlIiwiY29uc29sZSIsImxvZyIsInNhdmVDaGFuZ2VzIiwiYWN0aW9uQm9keVRlbXBsYXRlIiwicm93RGF0YSIsImljb24iLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwiZmV0Y2hDb21wYW5pZXMiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJlcnJvciIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsImRpdiIsImxhYmVsIiwibGVuZ3RoIiwidmFsdWUiLCJwYWdpbmF0b3IiLCJyb3dzIiwicm93c1BlclBhZ2VPcHRpb25zIiwidGFibGVTdHlsZSIsIm1pbldpZHRoIiwiZmllbGQiLCJoZWFkZXIiLCJzdHlsZSIsIndpZHRoIiwiYm9keSIsInZpc2libGUiLCJvbkhpZGUiLCJodG1sRm9yIiwiaWQiLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./componentes/companySumary.tsx\n"));

/***/ })

});