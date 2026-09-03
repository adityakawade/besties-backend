const StorageApiDocs = {
    "/storage/download": {
        post: {
            summary: "Generate sign url for download",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                path: { type: "string", example: "folder/file.ext" },

                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    discription: "success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    url: { type: "string", example: "signed url valid for 60 second" }
                                }
                            }
                        }

                    }
                },

                401: {
                    discription: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "Invalid token", }
                                }
                            }
                        }

                    }
                },

                500: {
                    discription: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", }
                                }
                            }
                        }

                    }
                }
            }
        },


    },
    "/storage/upload": {
        post: {
            summary: "Generate sign url for download",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                path: { type: "string", example: "folder/file.ext" },
                                type: { type: "string", example: "image/png" },
                                status: { type: "string", example: "private | public-read" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    discription: "success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    url: { type: "string", example: "signed url valid for 60 second" }
                                }
                            }
                        }

                    }
                },

                401: {
                    discription: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "Invalid token", }
                                }
                            }
                        }

                    }
                },

                500: {
                    discription: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", }
                                }
                            }
                        }

                    }
                }
            }
        }
    }
}

export default StorageApiDocs