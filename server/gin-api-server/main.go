/*----------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------*/

package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/microsoft/vscode-remote-try-go/hello"
)

func main() {
	portNumber := "9091"

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, hello.Hello())
	})

	fmt.Println("Server listening on port ", portNumber)
	if err := r.Run("0.0.0.0:" + portNumber); err != nil {
		fmt.Printf("服务器启动失败: %v\n", err)
	}
}
