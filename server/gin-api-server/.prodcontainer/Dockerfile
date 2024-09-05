FROM golang:1.18-rc-bullseye as builder
COPY . /temp
WORKDIR /temp

RUN go env -w GOPROXY=https://goproxy.cn,direct \
    && go env -w CGO_ENABLED=0 \
    && go env \
    && go mod tidy \
    && go build -o server .

FROM alpine:3.15
COPY --from=builder /temp/server .
CMD ["./server"]

