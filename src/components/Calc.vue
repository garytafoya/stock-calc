<template>
	<div class="container fluid">
		<b-row>
			<b-col cols="3"></b-col>
			<b-col cols="12" sm="10" md="6" lg="6" xl="6">
				<h2 class="text-white">INVESTMENT CALCULATOR</h2>
					<b-row class="mt-3 mb-1">
						<b-col sm="6">
							<label class="text-white">Calculate By:</label>
						</b-col>
						<b-col sm="6">
							<b-form-select
								v-model="calcBy"
								:options="options"
							></b-form-select>
						</b-col>
					</b-row>

					<b-row class="mb-1">
						<b-col sm="6">
							<label class="text-white">{{ this.calcBy }}:</label>
						</b-col>
						<b-col sm="6">
							<b-form-input
								id="calcLabel"
								v-model="calcValue"
								type="number"
							></b-form-input>
						</b-col>
					</b-row>

					<b-row class="mb-2">
						<b-col>
							<label class="text-white">Buy Price:</label>
						</b-col>
						<b-col sm="6">
							<b-form-input
								id="buy"
								v-model="buyPrice"
								type="number"
							></b-form-input>
						</b-col>
					</b-row>

					<b-row class="mb-2 ml-5">
						
						<label for="targetGain" class="text-white">
							Target Gain:
							<span class="h4"
								><strong>{{ targetGain }}%</strong></span
							>
						</label>
						<b-form-input
							id="targetGain"
							v-model="targetGain"
							type="range"
							min="1"
							max="10"
							step="1"
						></b-form-input>
					</b-row>

					<b-row class="mb-2 ml-5">
						<label for="risk" class="text-white">
							Risk:
							<span class="h4"
								><strong>{{ risk }}%</strong></span
							>
						</label>
						<b-form-input
							id="risk"
							v-model="risk"
							type="range"
							min="1"
							max="4"
							step="1"
						></b-form-input>
					</b-row>

					<!-- <b-row class="mb-5 ml-3 mr-3">
						<label for="risk" class="text-white">
							Risk:
							<span class="h4"
								><strong>${{ risk }}</strong></span
							>
						</label>
						<b-form-input
							id="risk"
							v-model="risk"
							type="range"
							min="0"
							max="1500"
							step="10"
						></b-form-input>
					</b-row> -->

					<!-- RESULTS -->

					<div v-if="formIsValid">
						<table class="table" style="width:100%">
							<thead>
								<tr class="table-primary">
									<th scope="col"><small>SHARES</small></th>
									<th scope="col"><small>BUY</small></th>
									<th scope="col"><small>TARGET</small></th>
									<th scope="col"><small>STOP LOSS</small></th>
								</tr>
							</thead>
							<tbody class="h5">
								<tr class="table-default">
									<td class="h4">{{ numberOfShares }}</td>
									<td class="h4">${{ formattedBuyPrice }}</td>
									<td>
										<span class="h4 positive">${{ targetSalePrice }}</span>
									</td>
									<td>
										<span class="h4 negative">${{ stopLoss }}</span>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="table" style="width:100%">
							<thead>
								<tr class="table-primary">
									<th scope="col"><small>INVESTMENT</small></th>
									<th scope="col"><small>RISK</small></th>
									<th scope="col"><small>GAIN</small></th>
									<th scope="col"><small>SALE VALUE</small></th>
								</tr>
							</thead>
							<tbody class="h4">
								<tr class="table-deafult">
									<td>${{ totalInvestment }}</td>
									<td>
										<span class="h4 negative">(${{ potentialRisk }})</span></td>
									<td><span class="h4 positive">${{ potentialGain }}</span></td>
									<td>${{ saleValue }}</td>
								</tr>
							</tbody>
						</table>
							<h5 class="text-center text-white">BUY {{ numberOfShares }} SHARES @ {{ formattedBuyPrice }}, SL:  {{ stopLoss }}, TGT:  {{ targetSalePrice }}</h5>
					</div>

					<div v-else>
						<h2 class="text-white">Need More Info</h2>
					</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	name: "Calc",
	data() {
		return {
			calcBy: "Investment",
			buyPrice: "",
			calcValue: "",
			targetGain: 2,
			risk: 1,
			options: [
				{ value: "Investment", text: "Total Investment" },
				{ value: "Shares", text: "# of Shares" },
			],
		};
	},
	computed: {
		formIsValid() {
			if (this.calcValue == "" || this.buyPrice == "") {
				console.log("form is bad");
				return false;
			} else {
				console.log("form is good");
				return true;
			}
		},
		totalInvestment() {
			if (this.calcBy == "Investment") {
				// return this.calcValue
				let total = Number(this.numberOfShares) * Number(this.buyPrice);
				return total.toFixed(0);
			} else {
				return this.calcValue * this.buyPrice;
			}
		},
		numberOfShares() {
			if (this.calcBy == "Investment") {
				let shares = Math.floor(Number(this.calcValue) / Number(this.buyPrice));
				return shares.toFixed(0);
			} else {
				return this.calcValue;
			}
		},
		targetSalePrice() {
			let gainPercent = this.targetGain / 100;
			let increase = Number(this.buyPrice) * Number(gainPercent);
			let target = Number(this.buyPrice) + increase;
			return target.toFixed(2);
		},
		stopLoss() {
			let riskPercent = Number(this.risk) / 100;
			let deduction = Number(riskPercent) * Number(this.buyPrice);
			let sl = Number(this.buyPrice) - deduction;
			return sl.toFixed(2);
		},
		saleValue() {
			let sv = Number(this.totalInvestment) + Number(this.potentialGain);
			return sv.toFixed(2);
		},
		potentialGain() {
			let pg = this.totalInvestment * (this.targetGain / 100);
			return pg.toFixed(2);
		},
		potentialRisk() {
			let pr = this.totalInvestment * (this.risk / 100);
			return pr.toFixed(2);
		},
		formattedBuyPrice() {
			let fbp = Number(this.buyPrice)
			return fbp.toFixed(2)
		}
	},
	methods: {},
};
</script>

<style>
.negative {
	color: #db6708;
}
.positive {
	color: #2bd809;
}
.result {
	color: #08b8fd;
}
</style>
