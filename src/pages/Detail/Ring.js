import React from "react";
import {
	Chart,
	Interval,
	Axis,
	Tooltip,
	Coordinate,
	Legend,
	View,
	Annotation,
	getTheme,
} from "bizcharts";



function Ring({ data = [], content = {}, intervalConfig = {} }) {
	const brandFill = getTheme().colors10[0];
	return (
		<Chart placeholder={false} height={200} width={200} padding="auto" autoFit>
			<Legend visible={false} />
			{/* 绘制图形 */}
			<View
				data={data}
				scale={{
					percent: {
						formatter: (val) => {
							return `${(val * 100).toFixed(2)  }%`;
						},
					},
				}}
			>
				<Coordinate type="theta" innerRadius={0.75} />
				<Interval
					position="percent"
					adjust="stack"
					// color="type"
					// color={["type", ["rgba(100, 100, 255, 0.6)", "#eee"]]}
					color={["type", [brandFill, "#eee"]]}
					size={16}
					// style={{ fillOpacity: 0.6 }}
					// label={['type', {offset: 40}]}
					{...intervalConfig}
				/>
				<Annotation.Text
					position={["50%", "35%"]}
					content={content.siteCode}
					style={{
						lineHeight: "240px",
						fontSize: "16",
						fill: "#000",
						textAlign: "center",
					}}
				/>
				<Annotation.Text
					position={["50%", "48%"]}
					content={content.title}
					style={{
						lineHeight: "240px",
						fontSize: "16",
						fill: "#000",
						textAlign: "center",
					}}
				/>
				<Annotation.Text
					position={["50%", "62%"]}
					content={content.percent}
					style={{
						lineHeight: "240px",
						fontSize: "24",
						fill: brandFill,
						textAlign: "center",
					}}
				/>
			</View>
		</Chart>
	);
}

// const myData = [
// 	{ type: "正式党员", percent: 0.56 },
// 	{ type: "预备党员", percent: 0.3334 },
// ];

// const renderContent = (value) => {
// 	if (value != undefined && value != null) {
// 		const scale = ((Math.round((value * 10000))) / 100.00).toFixed(2) + '%';
// 		return scale;
// 	}
// };

// const avg = renderContent(myData[0].percent)
// const myContent = {
// 	siteCode: "党员概况",
// 	title: "转正率",
// 	percent: avg,
// };

// // ReactDOM.render(
// // 	<>
// // 		<Ring data={myData} content={myContent} />
// // 		<Ring
// // 			data={myData}
// // 			content={myContent}
// // 			intervalConfig={{
// // 				style: { fillOpacity: 0.6 },
// // 				size: [
// // 					"type",
// // 					(type) => {
// // 						return type === "已完成" ? 12 : 6;
// // 					},
// // 				],
// // 			}}
// // 		/>
// // 	</>,
// // 	mountNode
// // );

export default Ring