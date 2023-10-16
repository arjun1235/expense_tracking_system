def logic(my_input):
    ls = my_input.split(",")
    sum = 0
    for i in ls:
        if i.isdigit():
            if int(i) < 0:
                break
            else:
                sum+=int(i)
        else:
            break
    return sum

# Do not edit below

# Get the input
my_input = "5,9,3,-1,5"

# Print output returned from the logic function
print(logic(my_input))
