const FriendApiDocs = {
    "/friend": {
        post: {
            summary: "Send A Friend Request",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                friend: { type: 'string', example: "your_friend_id" }
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
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        friend: {
                                            type: "object",
                                            properties: {
                                                fullname: { type: "string" },
                                                email: { type: "string" },
                                                mobile: { type: "string" },
                                                image: { type: "string" }
                                            }
                                        }
                                    }
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
        get: {
            summary: "Fetch your friend - login required",
            discription: "Auth token Required",
            responses: {
                200: {
                    discription: "success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Friend Request Sent" }
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

    "/friend/{id}": {
        put: {
            summary: "Accept Friend Request",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    default: 0,
                    required: true,
                    schema: { type: "string" }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: { type: 'string', example: "accepted" }
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
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        friend: {
                                            type: "object",
                                            properties: {
                                                message: { type: "string", example: "friend status updated" }
                                            }
                                        }
                                    }
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
        delete: {
            summary: "Unfollow or reject friend request",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    default: 0,
                    required: true,
                    schema: { type: "string" }
                }
            ],

            responses: {
                200: {
                    discription: "success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        friend: {
                                            type: "object",
                                            properties: {
                                                message: { type: "string", example: "friend  deleted" }
                                            }
                                        }
                                    }
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

    "/friend/suggestion": {
        get: {
            summary: "Get friend suggestion",
            discription: "Auth token Required",
            responses: {
                200: {
                    discription: "success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    fullname: { type: "string" },
                                    email: { type: "string" },
                                    mobile: { type: "string" },
                                    image: { type: "string" },

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

    "friens/request": {
        get: {
            summary: "Fetch friend request received",
            discription: "Auth token Required",
            responses: {
                200: {
                    discription: "success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    fullname: { type: "string" },
                                    email: { type: "string" },
                                    mobile: { type: "string" },
                                    image: { type: "string" },

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
export default FriendApiDocs