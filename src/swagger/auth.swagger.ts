const AuthApiDocs = {
    "/auth/signup": {
        post: {
            summary: "Register a New User",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                fullname: { type: "string" },
                                email: { type: "string" },
                                mobile: { type: "string" },
                                password: { type: "string" }

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
                                    message: { type: "string", example: "Signup Success" }
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
    },
    "/auth/login": {
        post: {
            summary: "Sign in a  User",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string" },
                                password: { type: "string" }

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
                                    message: { type: "string", example: "Login Success" },
                                    accessToken: { type: "string", example: "valid for 10 minutes http only cookie" },
                                    refreshToken: { type: "string", example: "valid for 7 days http only cookie" }
                                }
                            }
                        }

                    }
                },

                401: {
                    description: "Unauthorized - Authentication required or token is invalid",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Invalid credentials email or password incorrect"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Resource not found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "User not found , please try to signup first"
                                    }
                                }
                            }
                        }
                    }
                },

                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    },
    "/auth/logout": {
        post: {
            summary: "Logout a User",
            responses: {
                200: {
                    discription: "success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Logout Success" },
                                    accessToken: { type: "string", example: "Auto removed from cookie" },
                                    refreshToken: { type: "string", example: "Auto removed from cookie" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Internal Server Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/auth/refresh-token": {
        get: {
            summary: "Getting new accessToken and refreshToken",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refreshToken: { type: "string", example: "sent from http only cookie" }

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
                                    message: { type: "string", example: "Token refreshed" },
                                    accessToken: { type: "string", example: "valid for 10 minutes http only cookie" },
                                    refreshToken: { type: "string", example: "valid for 7 days http only cookie" }
                                }
                            }
                        }

                    }
                },

                401: {
                    description: "Unauthorized - Authentication required or token is invalid",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "failed to refresh token"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    },
    "/auth/session": {
        get: {
            summary: "Getting user info from token",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                accessToken: { type: "string", example: "sent automatically from http only cookie" }

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
                                    id: { type: "string" },
                                    email: { type: "string" },
                                    fullname: { type: "string" },
                                    mobile: { type: "string" },
                                    image: { type: "string" }
                                }
                            }
                        }

                    }
                },

                401: {
                    description: "Unauthorized - Authentication required or token is invalid",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "invalid session"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    },
    "/auth/profile-picture": {
        put: {
            summary: "Update image url",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                accessToken: { type: "string", example: "sent automatically from http only cookie" },
                                image: { type: "string", example: "your image public url" }

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
                                    image: { type: "string", example: "image_url" }
                                }

                            }

                        }
                    },

                    401: {
                        description: "Unauthorized - Authentication required or token is invalid",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "invalid session"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                            example: "Internal server error"
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }

    }
}

export default AuthApiDocs