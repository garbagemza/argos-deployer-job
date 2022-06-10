//
// metaBuilder.test (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza
const MetaBuilder = require('../../express/metaBuilder')

describe('express.metaBuilder', () => {
    test('init', () => {
        const express = require('express')
        const meta = new MetaBuilder(express)
        meta.builder()
            .post('/')
            .build()
    })
})