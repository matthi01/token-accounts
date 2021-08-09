import React from "react"
import { shallow } from "enzyme"
import Pagination from "./Pagination"

describe("Pagination", () => {
    const setPageIndexMock = jest.fn(pageIndex => {})
    const setPageSizeMock = jest.fn(pageSize => {})
    it("Renders correct page numbers", () => {
        const wrapper = shallow(
            <Pagination 
                pageIndex={0}
                setPageIndex={setPageIndexMock}
                pageSize={10}
                setPageSize={setPageSizeMock}
                totalRecords={50}
            />
        )
        expect(wrapper.find(".page-indicator").text()).toBe("1 of 5")
    })

    it("Updates pageIndex on 'Next' click", () => {
        const wrapper = shallow(
            <Pagination 
                pageIndex={0}
                setPageIndex={setPageIndexMock}
                pageSize={10}
                setPageSize={setPageSizeMock}
                totalRecords={50}
            />
        )
        wrapper.find("#pagination-btn-next").simulate("click")
        expect(setPageIndexMock).toHaveBeenCalledWith(1)
    })

    it("Updates pageIndex on 'Previous' click", () => {
        const wrapper = shallow(
            <Pagination 
                pageIndex={3}
                setPageIndex={setPageIndexMock}
                pageSize={10}
                setPageSize={setPageSizeMock}
                totalRecords={50}
            />
        )
        wrapper.find("#pagination-btn-previous").simulate("click")
        expect(setPageIndexMock).toHaveBeenCalledWith(2)
    })

    it("Updates pageIndex on 'First Page' click", () => {
        const wrapper = shallow(
            <Pagination 
                pageIndex={3}
                setPageIndex={setPageIndexMock}
                pageSize={10}
                setPageSize={setPageSizeMock}
                totalRecords={50}
            />
        )
        wrapper.find("#pagination-btn-first").simulate("click")
        expect(setPageIndexMock).toHaveBeenCalledWith(0)
    })
    
    it("Updates pageIndex on 'Last Page' click", () => {
        const wrapper = shallow(
            <Pagination 
                pageIndex={0}
                setPageIndex={setPageIndexMock}
                pageSize={10}
                setPageSize={setPageSizeMock}
                totalRecords={50}
            />
        )
        wrapper.find("#pagination-btn-last").simulate("click")
        expect(setPageIndexMock).toHaveBeenCalledWith(4)
    })
})