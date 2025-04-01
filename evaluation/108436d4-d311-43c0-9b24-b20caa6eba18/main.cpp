#include <iostream>
#include <vector>
#include <unordered_map>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> numMap;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        
        numMap[nums[i]] = i;
    }
    
    return {};
}

int main() {
    std::vector<int> nums;
    int num, target;
    while (std::cin >> num) {
        nums.push_back(num);
    }
    target = nums.back();
    nums.pop_back();
    
    std::vector<int> result = twoSum(nums, target);
    
    if (!result.empty()) {
        std::cout << result[0] << " " << result[1] << std::endl;
    }
    
    return 0;
}