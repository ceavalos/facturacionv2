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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CompanySumary; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var primereact_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primereact/button */ \"(app-pages-browser)/./node_modules/primereact/button/button.esm.js\");\n/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primereact/datatable */ \"(app-pages-browser)/./node_modules/primereact/datatable/datatable.esm.js\");\n/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primereact/column */ \"(app-pages-browser)/./node_modules/primereact/column/column.esm.js\");\n/* harmony import */ var primereact_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primereact/dialog */ \"(app-pages-browser)/./node_modules/primereact/dialog/dialog.esm.js\");\n/* harmony import */ var primereact_inputtext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primereact/inputtext */ \"(app-pages-browser)/./node_modules/primereact/inputtext/inputtext.esm.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst ciavacia = {\n    _id: \"\",\n    companyCode: \"\",\n    companyName: \"\",\n    nit: \"\",\n    address: \"\",\n    legalRepresentative: \"\",\n    phone: \"\",\n    createdAt: new Date()\n};\nfunction CompanySumary() {\n    _s();\n    const [companies, setCompanies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [selectedCompany, setSelectedCompany] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(ciavacia);\n    const [editDialogVisible, setEditDialogVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isEditMode, setIsEditMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    //\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    // Abrir modal para crear o editar\n    const openDialog = function() {\n        let companyToEdit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;\n        setIsEditMode(!!companyToEdit);\n        //\n        console.log(!!companyToEdit);\n        if (!!companyToEdit) {\n            setSelectedCompany(companyToEdit);\n        } else {\n            console.log(\"entrando a false\");\n            setSelectedCompany(ciavacia);\n            console.log(selectedCompany);\n        }\n        setEditDialogVisible(true);\n        console.log(selectedCompany);\n    };\n    // Guardar los cambios\n    const saveChanges = ()=>{\n        if (selectedCompany) {\n            // setCompanies((prevCompanies) =>\n            //   prevCompanies.map((comp) =>\n            //     comp._id === selectedCompany._id ? selectedCompany : comp\n            //   )\n            // );\n            if (isEditMode) {\n            /*setCompanies((prevCompanies) =>\n         prevCompanies.map((c) => (c._id === company._id ? company : c))         \n       );*/ } else {\n            /*setCompanies((prevCompanies) => [\n          ...prevCompanies,\n          { ...company, _id: prevCompanies.length + 1 },\n        ]);*/ }\n        }\n        setEditDialogVisible(false);\n    };\n    // Renderizar el botón de editar\n    const actionBodyTemplate = (rowData)=>{\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_button__WEBPACK_IMPORTED_MODULE_3__.Button, {\n            icon: \"pi pi-pencil\",\n            className: \"p-button-rounded p-button-success\",\n            onClick: ()=>openDialog(rowData)\n        }, void 0, false, {\n            fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n            lineNumber: 87,\n            columnNumber: 7\n        }, this);\n    };\n    const fetchCompanies = async ()=>{\n        const token = localStorage.getItem(\"token\");\n        if (!token) {\n            console.error(\"No token found\");\n            router.push(\"/login\");\n            return;\n        }\n        try {\n            const response = await fetch(\"/dashboard/companies/api\", {\n                method: \"GET\",\n                headers: {\n                    Authorization: \"Bearer \".concat(token),\n                    \"Content-Type\": \"application/json\"\n                }\n            });\n            if (!response.ok) {\n                throw new Error(\"Failed to fetch companies\");\n                router.push(\"/login\");\n            }\n            const data = await response.json();\n            setCompanies(data);\n        } catch (error) {\n            console.error(\"Error fetching companies:\", error);\n            router.push(\"/login\");\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchCompanies();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_button__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                label: \"Agregar Compa\\xf1\\xeda\",\n                icon: \"pi pi-plus\",\n                onClick: ()=>openDialog(),\n                className: \"p-mb-3\"\n            }, void 0, false, {\n                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                lineNumber: 133,\n                columnNumber: 7\n            }, this),\n            companies.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_datatable__WEBPACK_IMPORTED_MODULE_4__.DataTable, {\n                        value: companies,\n                        paginator: true,\n                        rows: 5,\n                        rowsPerPageOptions: [\n                            5,\n                            10,\n                            25,\n                            50\n                        ],\n                        tableStyle: {\n                            minWidth: \"50rem\"\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_column__WEBPACK_IMPORTED_MODULE_5__.Column, {\n                                field: \"companyName\",\n                                header: \"Company Name\",\n                                style: {\n                                    width: \"25%\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 143,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_column__WEBPACK_IMPORTED_MODULE_5__.Column, {\n                                field: \"legalRepresentative\",\n                                header: \"Legal Representative\",\n                                style: {\n                                    width: \"25%\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 144,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_column__WEBPACK_IMPORTED_MODULE_5__.Column, {\n                                field: \"phone\",\n                                header: \"Phone\",\n                                style: {\n                                    width: \"25%\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 145,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_column__WEBPACK_IMPORTED_MODULE_5__.Column, {\n                                header: \"Editar\",\n                                body: actionBodyTemplate,\n                                style: {\n                                    width: \"25%\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 146,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                        lineNumber: 142,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_dialog__WEBPACK_IMPORTED_MODULE_6__.Dialog, {\n                        header: \"PrimeReact Modal\",\n                        visible: editDialogVisible,\n                        style: {\n                            width: \"50vw\"\n                        },\n                        onHide: ()=>setEditDialogVisible(false),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"field\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                        htmlFor: \"name\",\n                                        children: \"Nombre\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                        lineNumber: 158,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_inputtext__WEBPACK_IMPORTED_MODULE_7__.InputText, {\n                                        id: \"companyName\",\n                                        value: selectedCompany.companyName,\n                                        onChange: (e)=>setSelectedCompany({\n                                                ...selectedCompany,\n                                                companyName: e.target.value\n                                            })\n                                    }, void 0, false, {\n                                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                        lineNumber: 159,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                                lineNumber: 157,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                            lineNumber: 156,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                        lineNumber: 150,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                lineNumber: 141,\n                columnNumber: 9\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: \"No se encontraron compa\\xf1\\xedas.\"\n                    }, void 0, false, {\n                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                        lineNumber: 170,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(primereact_button__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                        label: \"Click Me\",\n                        icon: \"pi pi-check\",\n                        className: \"p-button-raised p-button-rounded\"\n                    }, void 0, false, {\n                        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n                        lineNumber: 171,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/ceavalos/Desktop/Desarrollo/NextJs/facturacionv2.0/componentes/companySumary.tsx\",\n        lineNumber: 132,\n        columnNumber: 5\n    }, this);\n}\n_s(CompanySumary, \"7F8Zjqg7DJ8RJbw5emV4Siplpw4=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = CompanySumary;\nvar _c;\n$RefreshReg$(_c, \"CompanySumary\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudGVzL2NvbXBhbnlTdW1hcnkudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDbUQ7QUFFUjtBQUNNO0FBQ047QUFDQTtBQUNNO0FBQ0w7QUFnQjVDLE1BQU1TLFdBQXlCO0lBQzdCQyxLQUFLO0lBQUlDLGFBQWE7SUFDdEJDLGFBQWE7SUFDYkMsS0FBSztJQUNMQyxTQUFTO0lBQ1RDLHFCQUFxQjtJQUNyQkMsT0FBTztJQUNQQyxXQUFXLElBQUlDO0FBQ2pCO0FBRWUsU0FBU0M7O0lBQ3RCLE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHbkIsK0NBQVFBLENBQWlCLEVBQUU7SUFDN0QsTUFBTSxDQUFDb0IsaUJBQWlCQyxtQkFBbUIsR0FBR3JCLCtDQUFRQSxDQUFlTztJQUNyRSxNQUFNLENBQUNlLG1CQUFtQkMscUJBQXFCLEdBQUd2QiwrQ0FBUUEsQ0FBQztJQUMzRCxNQUFNLENBQUN3QixZQUFZQyxjQUFjLEdBQUd6QiwrQ0FBUUEsQ0FBQztJQUU3QyxFQUFFO0lBQ0YsTUFBTTBCLFNBQVNwQiwwREFBU0E7SUFFeEIsa0NBQWtDO0lBQ2xDLE1BQU1xQixhQUFhO1lBQUNDLGlGQUFxQztRQUN2REgsY0FBYyxDQUFDLENBQUNHO1FBQ2hCLEVBQUU7UUFDRkMsUUFBUUMsR0FBRyxDQUFDLENBQUMsQ0FBQ0Y7UUFDZCxJQUFJLENBQUMsQ0FBQ0EsZUFBZTtZQUNuQlAsbUJBQW1CTztRQUNyQixPQUFPO1lBQ0xDLFFBQVFDLEdBQUcsQ0FBQztZQUNaVCxtQkFBbUJkO1lBQ25Cc0IsUUFBUUMsR0FBRyxDQUFDVjtRQUNkO1FBQ0FHLHFCQUFxQjtRQUNyQk0sUUFBUUMsR0FBRyxDQUFDVjtJQUNkO0lBRUEsc0JBQXNCO0lBQ3RCLE1BQU1XLGNBQWM7UUFDbEIsSUFBSVgsaUJBQWlCO1lBQ25CLGtDQUFrQztZQUNsQyxnQ0FBZ0M7WUFDaEMsZ0VBQWdFO1lBQ2hFLE1BQU07WUFDTixLQUFLO1lBRUws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SndCbEI7O1FBT1BYLHNEQUFTQTs7O0tBUEZXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudGVzL2NvbXBhbnlTdW1hcnkudHN4P2Q0YzgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvc2lkZUJhclN0eWxlcy5tb2R1bGUuY3NzJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3ByaW1lcmVhY3QvYnV0dG9uJztcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJ3ByaW1lcmVhY3QvZGF0YXRhYmxlJztcbmltcG9ydCB7IENvbHVtbiB9IGZyb20gJ3ByaW1lcmVhY3QvY29sdW1uJztcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJ3ByaW1lcmVhY3QvZGlhbG9nJztcbmltcG9ydCB7IElucHV0VGV4dCB9IGZyb20gJ3ByaW1lcmVhY3QvaW5wdXR0ZXh0JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XG4vL1xuaW1wb3J0IGNvbXBhbmlBcGkgZnJvbSAnLi4vYXBwL2FjdGlvbnMvY29tcGFueS1BY3Rpb25zJztcbmltcG9ydCB7IG5vdyB9IGZyb20gJ21vbmdvb3NlJztcblxudHlwZSBDb21wYW55UHJvcHMgPSB7XG4gIF9pZDogc3RyaW5nO1xuICBjb21wYW55Q29kZTogc3RyaW5nO1xuICBjb21wYW55TmFtZTogc3RyaW5nO1xuICBuaXQ6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xuICBsZWdhbFJlcHJlc2VudGF0aXZlOiBzdHJpbmc7XG4gIHBob25lOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbn1cblxuY29uc3QgY2lhdmFjaWE6IENvbXBhbnlQcm9wcyA9IHtcbiAgX2lkOiAnJywgY29tcGFueUNvZGU6ICcnLFxuICBjb21wYW55TmFtZTogJycsXG4gIG5pdDogJycsXG4gIGFkZHJlc3M6ICcnLFxuICBsZWdhbFJlcHJlc2VudGF0aXZlOiAnJyxcbiAgcGhvbmU6ICcnLFxuICBjcmVhdGVkQXQ6IG5ldyBEYXRlKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tcGFueVN1bWFyeSgpIHtcbiAgY29uc3QgW2NvbXBhbmllcywgc2V0Q29tcGFuaWVzXSA9IHVzZVN0YXRlPENvbXBhbnlQcm9wc1tdPihbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZENvbXBhbnksIHNldFNlbGVjdGVkQ29tcGFueV0gPSB1c2VTdGF0ZTxDb21wYW55UHJvcHM+KGNpYXZhY2lhKTtcbiAgY29uc3QgW2VkaXREaWFsb2dWaXNpYmxlLCBzZXRFZGl0RGlhbG9nVmlzaWJsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0VkaXRNb2RlLCBzZXRJc0VkaXRNb2RlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvL1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICAvLyBBYnJpciBtb2RhbCBwYXJhIGNyZWFyIG8gZWRpdGFyXG4gIGNvbnN0IG9wZW5EaWFsb2cgPSAoY29tcGFueVRvRWRpdDogQ29tcGFueVByb3BzIHwgbnVsbCA9IG51bGwpID0+IHtcbiAgICBzZXRJc0VkaXRNb2RlKCEhY29tcGFueVRvRWRpdCk7XG4gICAgLy9cbiAgICBjb25zb2xlLmxvZyghIWNvbXBhbnlUb0VkaXQpXG4gICAgaWYgKCEhY29tcGFueVRvRWRpdCkge1xuICAgICAgc2V0U2VsZWN0ZWRDb21wYW55KGNvbXBhbnlUb0VkaXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZW50cmFuZG8gYSBmYWxzZVwiKSAgICAgXG4gICAgICBzZXRTZWxlY3RlZENvbXBhbnkoY2lhdmFjaWEpO1xuICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRDb21wYW55KVxuICAgIH1cbiAgICBzZXRFZGl0RGlhbG9nVmlzaWJsZSh0cnVlKTtcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZENvbXBhbnkpXG4gIH07XG5cbiAgLy8gR3VhcmRhciBsb3MgY2FtYmlvc1xuICBjb25zdCBzYXZlQ2hhbmdlcyA9ICgpID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRDb21wYW55KSB7XG4gICAgICAvLyBzZXRDb21wYW5pZXMoKHByZXZDb21wYW5pZXMpID0+XG4gICAgICAvLyAgIHByZXZDb21wYW5pZXMubWFwKChjb21wKSA9PlxuICAgICAgLy8gICAgIGNvbXAuX2lkID09PSBzZWxlY3RlZENvbXBhbnkuX2lkID8gc2VsZWN0ZWRDb21wYW55IDogY29tcFxuICAgICAgLy8gICApXG4gICAgICAvLyApO1xuXG4gICAgICBpZiAoaXNFZGl0TW9kZSkge1xuICAgICAgICAvKnNldENvbXBhbmllcygocHJldkNvbXBhbmllcykgPT5cbiAgICAgICAgIHByZXZDb21wYW5pZXMubWFwKChjKSA9PiAoYy5faWQgPT09IGNvbXBhbnkuX2lkID8gY29tcGFueSA6IGMpKSAgICAgICAgIFxuICAgICAgICk7Ki9cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qc2V0Q29tcGFuaWVzKChwcmV2Q29tcGFuaWVzKSA9PiBbXG4gICAgICAgICAgLi4ucHJldkNvbXBhbmllcyxcbiAgICAgICAgICB7IC4uLmNvbXBhbnksIF9pZDogcHJldkNvbXBhbmllcy5sZW5ndGggKyAxIH0sXG4gICAgICAgIF0pOyovXG4gICAgICB9XG5cbiAgICB9XG4gICAgc2V0RWRpdERpYWxvZ1Zpc2libGUoZmFsc2UpO1xuICB9O1xuXG4gIC8vIFJlbmRlcml6YXIgZWwgYm90w7NuIGRlIGVkaXRhclxuICBjb25zdCBhY3Rpb25Cb2R5VGVtcGxhdGUgPSAocm93RGF0YTogQ29tcGFueVByb3BzKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCdXR0b25cbiAgICAgICAgaWNvbj1cInBpIHBpLXBlbmNpbFwiXG4gICAgICAgIGNsYXNzTmFtZT1cInAtYnV0dG9uLXJvdW5kZWQgcC1idXR0b24tc3VjY2Vzc1wiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9wZW5EaWFsb2cocm93RGF0YSl9XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hDb21wYW5pZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdObyB0b2tlbiBmb3VuZCcpO1xuICAgICAgcm91dGVyLnB1c2goXCIvbG9naW5cIilcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2Rhc2hib2FyZC9jb21wYW5pZXMvYXBpJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIGNvbXBhbmllcycpO1xuICAgICAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgc2V0Q29tcGFuaWVzKGRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBjb21wYW5pZXM6JywgZXJyb3IpO1xuICAgICAgcm91dGVyLnB1c2goXCIvbG9naW5cIilcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcblxuICAgIGZldGNoQ29tcGFuaWVzKCk7XG5cbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxCdXR0b25cbiAgICAgICAgbGFiZWw9XCJBZ3JlZ2FyIENvbXBhw7HDrWFcIlxuICAgICAgICBpY29uPVwicGkgcGktcGx1c1wiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9wZW5EaWFsb2coKX1cbiAgICAgICAgY2xhc3NOYW1lPVwicC1tYi0zXCJcbiAgICAgIC8+XG5cbiAgICAgIHtjb21wYW5pZXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8RGF0YVRhYmxlIHZhbHVlPXtjb21wYW5pZXN9IHBhZ2luYXRvciByb3dzPXs1fSByb3dzUGVyUGFnZU9wdGlvbnM9e1s1LCAxMCwgMjUsIDUwXX0gdGFibGVTdHlsZT17eyBtaW5XaWR0aDogJzUwcmVtJyB9fT5cbiAgICAgICAgICAgIDxDb2x1bW4gZmllbGQ9XCJjb21wYW55TmFtZVwiIGhlYWRlcj1cIkNvbXBhbnkgTmFtZVwiIHN0eWxlPXt7IHdpZHRoOiAnMjUlJyB9fT48L0NvbHVtbj5cbiAgICAgICAgICAgIDxDb2x1bW4gZmllbGQ9XCJsZWdhbFJlcHJlc2VudGF0aXZlXCIgaGVhZGVyPVwiTGVnYWwgUmVwcmVzZW50YXRpdmVcIiBzdHlsZT17eyB3aWR0aDogJzI1JScgfX0+PC9Db2x1bW4+XG4gICAgICAgICAgICA8Q29sdW1uIGZpZWxkPVwicGhvbmVcIiBoZWFkZXI9XCJQaG9uZVwiIHN0eWxlPXt7IHdpZHRoOiAnMjUlJyB9fT48L0NvbHVtbj5cbiAgICAgICAgICAgIDxDb2x1bW4gaGVhZGVyPVwiRWRpdGFyXCIgYm9keT17YWN0aW9uQm9keVRlbXBsYXRlfSBzdHlsZT17eyB3aWR0aDogJzI1JScgfX0+PC9Db2x1bW4+XG4gICAgICAgICAgPC9EYXRhVGFibGU+XG5cbiAgICAgICAgICB7LyogVmVudGFuYSBNb2RhbCAqL31cbiAgICAgICAgICA8RGlhbG9nXG4gICAgICAgICAgICBoZWFkZXI9XCJQcmltZVJlYWN0IE1vZGFsXCJcbiAgICAgICAgICAgIHZpc2libGU9e2VkaXREaWFsb2dWaXNpYmxlfVxuICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICc1MHZ3JyB9fVxuICAgICAgICAgICAgb25IaWRlPXsoKSA9PiBzZXRFZGl0RGlhbG9nVmlzaWJsZShmYWxzZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibmFtZVwiPk5vbWJyZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0VGV4dFxuICAgICAgICAgICAgICAgICAgaWQ9XCJjb21wYW55TmFtZVwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb21wYW55LmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWxlY3RlZENvbXBhbnkoeyAuLi5zZWxlY3RlZENvbXBhbnksIGNvbXBhbnlOYW1lOmUudGFyZ2V0LnZhbHVlICB9KX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvRGlhbG9nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPHA+Tm8gc2UgZW5jb250cmFyb24gY29tcGHDscOtYXMuPC9wPlxuICAgICAgICAgIDxCdXR0b24gbGFiZWw9XCJDbGljayBNZVwiIGljb249XCJwaSBwaS1jaGVja1wiIGNsYXNzTmFtZT1cInAtYnV0dG9uLXJhaXNlZCBwLWJ1dHRvbi1yb3VuZGVkXCIgLz5cbiAgICAgICAgPC8+XG4gICAgICApXG4gICAgICB9XG4gICAgPC9kaXYgPlxuICApO1xuXG5cblxuXG59XG5cblxuXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkJ1dHRvbiIsIkRhdGFUYWJsZSIsIkNvbHVtbiIsIkRpYWxvZyIsIklucHV0VGV4dCIsInVzZVJvdXRlciIsImNpYXZhY2lhIiwiX2lkIiwiY29tcGFueUNvZGUiLCJjb21wYW55TmFtZSIsIm5pdCIsImFkZHJlc3MiLCJsZWdhbFJlcHJlc2VudGF0aXZlIiwicGhvbmUiLCJjcmVhdGVkQXQiLCJEYXRlIiwiQ29tcGFueVN1bWFyeSIsImNvbXBhbmllcyIsInNldENvbXBhbmllcyIsInNlbGVjdGVkQ29tcGFueSIsInNldFNlbGVjdGVkQ29tcGFueSIsImVkaXREaWFsb2dWaXNpYmxlIiwic2V0RWRpdERpYWxvZ1Zpc2libGUiLCJpc0VkaXRNb2RlIiwic2V0SXNFZGl0TW9kZSIsInJvdXRlciIsIm9wZW5EaWFsb2ciLCJjb21wYW55VG9FZGl0IiwiY29uc29sZSIsImxvZyIsInNhdmVDaGFuZ2VzIiwiYWN0aW9uQm9keVRlbXBsYXRlIiwicm93RGF0YSIsImljb24iLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwiZmV0Y2hDb21wYW5pZXMiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJlcnJvciIsInB1c2giLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJvayIsIkVycm9yIiwiZGF0YSIsImpzb24iLCJkaXYiLCJsYWJlbCIsImxlbmd0aCIsInZhbHVlIiwicGFnaW5hdG9yIiwicm93cyIsInJvd3NQZXJQYWdlT3B0aW9ucyIsInRhYmxlU3R5bGUiLCJtaW5XaWR0aCIsImZpZWxkIiwiaGVhZGVyIiwic3R5bGUiLCJ3aWR0aCIsImJvZHkiLCJ2aXNpYmxlIiwib25IaWRlIiwiaHRtbEZvciIsImlkIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwicCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./componentes/companySumary.tsx\n"));

/***/ })

});