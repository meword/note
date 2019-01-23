describe("函数基本API测试", function() {
	it("+1函数应用", function() {
		expect(window.add(1)).toBe(1);
	})
	it("+1函数应用分歧", function() {
		expect(window.add(2)).toBe(3);
	})
})