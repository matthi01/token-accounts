/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { mount, shallow, ShallowWrapper } from "enzyme"
import AccountsTable from "./AccountsTable"
import NoResults from "../Table/NoResults"
import * as helpers from "../../helpers/axios"
import Spinner from "../Spinner"

describe("AccountsTable", () => {
    let wrapper: ShallowWrapper
    beforeEach(() => {
        wrapper = shallow(<AccountsTable />)
    })

    it("Renders AccountsTable component", () => {
        expect(wrapper.exists()).toBe(true)
    })

    it("Renders NoResults message if no data", () => {
        expect(wrapper.find(Spinner).exists()).toBeFalsy()
        expect(wrapper.find(NoResults).exists()).toBeTruthy()
    })

    it("Renders Spinner while waiting for data fetch", () => {
        const mockFetch = jest.spyOn(helpers, "fetchData")
        mockFetch.mockImplementationOnce((url: string) => {
            return new Promise((resolve, reject) => {})
        })
        const wrapper = mount(<AccountsTable />)
        expect(wrapper.find(NoResults).exists()).toBeFalsy()
        expect(wrapper.find(Spinner).exists()).toBeTruthy()
    })

    it("Calls the /accounts api endpoint", () => {
        const mockFetch = jest.spyOn(helpers, "fetchData")
        mockFetch.mockImplementationOnce((url: string) => {
            expect(url).toContain(`${process.env.REACT_APP_API_HOST}/api/accounts`)
            return new Promise((resolve, reject) => {})
        })
        const wrapper = mount(<AccountsTable />)
    })

    describe("Sorting", () => {
        let mockFetch: any
        beforeEach(() => {
            mockFetch = jest.spyOn(helpers, "fetchData")
            mockFetch.mockImplementation((url: string) => {
                return new Promise((resolve, reject) => {})
            })
        })

        it("Updates API call on column sort (first click - ascending)", () => {
            const wrapper = mount(<AccountsTable />)
            mockFetch.mockImplementationOnce((url: string) => {
                expect(url).toContain(`sort=country:asc`)
                return new Promise((resolve, reject) => {})
            })
            wrapper.find("#country").simulate("click")
        })
    
        it("Updates API call on column sort (second click - descending)", () => {
            const wrapper = mount(<AccountsTable />)
            wrapper.find("#country").simulate("click")
            mockFetch.mockImplementationOnce((url: string) => {
                expect(url).toContain(`sort=country:desc`)
                return new Promise((resolve, reject) => {})
            })
            wrapper.find("#country").simulate("click")
        })
    
        it("Updates API call on column sort (third click - cancels sorting)", () => {
            const wrapper = mount(<AccountsTable />)
            wrapper.find("#country").simulate("click")
            wrapper.find("#country").simulate("click")
            mockFetch.mockImplementationOnce((url: string) => {
                expect(url).toContain(`sort=&`)
                return new Promise((resolve, reject) => {})
            })
            wrapper.find("#country").simulate("click")
        })
    })
})