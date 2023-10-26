def longestCommonPrefix(strs):
        if not strs:
            return ""

        strs.sort() # it is used to ensure the shorest string is first
        first_str = strs[0]
        last_str = strs[-1]

        common_prefix = []
        for i in range(len(first_str)):
            if i < len(last_str) and first_str[i] == last_str[i]:
                common_prefix.append(first_str[i])
            else:
                break
        return "".join(common_prefix





strs = ["flower","flow","flight","flow","floi"]
print( longestCommonPrefix(strs))
