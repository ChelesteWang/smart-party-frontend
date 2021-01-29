import React from "react";
import {
	Chart,
	Interval,
	Coordinate,
	Legend,
	View,
	Annotation,
	getTheme,
} from "bizcharts";



function Ring({ data = [], content = {}, intervalConfig = {} }) {
	const brandFill = '#ff7875';
	return (
		<Chart placeholder={false} height={200} width={200} padding="auto" autoFit>
			<Legend visible={false} />
			{/* 绘制图形 */}
			<View
				data={data}
				scale={{
					percent: {
						formatter: (val) => {
							return `${(val * 100).toFixed(2)}%`;
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

export default Ring