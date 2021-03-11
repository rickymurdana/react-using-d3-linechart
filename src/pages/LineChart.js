import React, { Component, createRef, useState, useEffect, useRef } from 'react';
import * as d3 from "d3";

export default function LineChart(props) {
    const svgHeight = 300;
    const svgWidth = 500;
    const paddingLeft = 10;
    const paddingRight = 30;
    const paddingBottom = 20;


    const svgRef = createRef();

    useEffect(() => {
        console.log(props.data)
        const svg = d3.select(svgRef.current);


        const xScale = d3.scaleLinear()
            .domain([0.5, 0.8])
            .range([paddingLeft, svgWidth - paddingRight * 2]);

        const maxValue = d3.max(props.data, (d) => d[1])

        const highestYValue = svgHeight - maxValue + paddingBottom

        const yScale = d3.scalePoint()
            .range([10, svgHeight - paddingBottom])
            .domain(props.data.map(function (d) {
                return d[0];
            }))



        const xAxis = d3.axisBottom(xScale)

        svg.select(".x-axis")
            .style('transform', ` translateY(${svgHeight - paddingBottom}px)`)
            .call(xAxis);

        const yAxis = d3.axisRight(yScale)

        svg.select(".y-axis")
            .style('transform', ` translateX(${svgWidth - paddingRight * 2}px)`)
            .call(yAxis);

        const myLine = d3.line()
            .x((value, index) => xScale(value[1]))
            .y((value, index) => yScale(value[0]))
            .curve(d3.curveLinear);

        svg.selectAll("circle")
            .data(props.data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(d[1]))
            .attr("cy", (d, i) => yScale(d[0]))
            .attr("r", (d) => "3");

        svg.selectAll('.line')
            .data([props.data])
            .join('path')
            .attr('class', 'line')
            .attr('d', myLine)
            .attr('fill', 'none')
            .attr('stroke', 'orange');
    }, [props.data]);



    return (
        <React.Fragment>
            <svg width={svgWidth} height={svgHeight} ref={svgRef} className="svg">
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </React.Fragment>
    )
}

