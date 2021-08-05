import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import GlobalFilter from "./GlobalFilter"

describe("GlobalFilter", () => {
    let wrapper: ShallowWrapper
    const setFilterMock = jest.fn(filter => {})
    const event = {
        preventDefault() {},
        target: { value: 'test' }
    }

    beforeEach(() => {
        wrapper = shallow(
            <GlobalFilter 
                filter="" 
                setFilter={setFilterMock} 
            />
        )
    })

    it("Does not immediately set the filter on input change", () => {
        wrapper.find(".search").childAt(0).simulate("change", event)
        expect(setFilterMock).not.toHaveBeenCalled()
    })

    it("Throttles input and sets filter after 500ms input inactivity", () => {
        wrapper.find(".search").childAt(0).simulate("change", event)
        setTimeout(() => {
            expect(setFilterMock).toHaveBeenCalledWith("test")
        }, 600)
    })
})