import React from "react"
import { shallow } from "enzyme"
import ConditionalRender from "./ConditionalRender";

describe("ConditionalRender", () => {
    it("Renders child component when show is set to true", () => {
        const wrapper = shallow(
            <ConditionalRender show={true}>
                <div>Test text from child</div>
            </ConditionalRender>
        )
        expect(wrapper.children()).toHaveLength(1)
        expect(wrapper.text()).toEqual("Test text from child")
    })

    it("Does not render child component when show is set to false", () => {
        const wrapper = shallow(
            <ConditionalRender show={false}>
                <div>Test text from child</div>
            </ConditionalRender>
        )
        expect(wrapper.children()).toHaveLength(0)
        expect(wrapper.text()).toEqual("")
    })
})