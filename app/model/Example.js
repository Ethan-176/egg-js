"use strict";

module.exports = (app) => {
    const {
        INTEGER, STRING, TEXT, DATE, ENUM, JSON, NOW
        // BOOLEAN, FLOAT, REAL, DOUBLE,
        // DECIMAL =>  DECIMAL(10,2) 8位整数，2位小数 DECIMAL(10, 8) 2位整数，8位小数
    } = app.Sequelize;
    
    const UserMessages = app.model.define(
        "user_messages", // 表名 列举哦个用户消息表
        {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "消息ID",
            },
            uid: {
                type: INTEGER,
                allowNull: false,
                comment: "接收消息的用户ID",
            },
            messageType: {
                type: ENUM("system", "business"),
                allowNull: false,
                comment: "消息类型：system 为系统消息，business 为业务消息",
            },
            content: {
                type: TEXT,
                allowNull: false,
                comment: "消息内容",
            },
            status: {
                type: ENUM("unread", "read"),
                defaultValue: "unread",
                comment: "消息状态：unread 为未读，read 为已读",
            },
            sendTime: {
                type: DATE,
                allowNull: false,
                defaultValue: NOW,
                comment: "消息发送时间",
            },
            readTime: {
                type: DATE,
                comment: "消息阅读时间",
            },
            title: {
                type: STRING(255),
                allowNull: false,
                comment: "消息标题",
            },
            link: {
                type: STRING(255),
                comment: "消息关联链接（例如业务消息跳转的页面）",
            },
            extraData: {
                type: JSON,
                comment: "额外的业务数据，存储业务逻辑相关信息",
            },
            createdAt: {
                type: DATE,
                allowNull: false,
                defaultValue: NOW,
                comment: "记录创建时间",
            },
            updatedAt: {
                type: DATE,
                defaultValue: NOW,
                comment: "记录更新时间",
            },
        },
        {
            timestamps: true, // 开启自动生成 createdAt 和 updatedAt 字段
            comment: "用户消息表，包含系统消息和业务消息",
            indexes: [
                { fields: ["uid"], name: "user_messages_uid_index" },
                { fields: ["sendTime"], name: "user_messages_send_time_index" },
            ],
        },
    );
    
    UserMessages.associate = function () {};
    
    return UserMessages;
};
