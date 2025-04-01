dir="./inputs"
a="inputs"
b="user_outputs"
for input_file in $dir/*;
do
    output_file=$(echo "$input_file" | sed "s/$a/$b/")
    touch $output_file
    timeout 2 ./main < $input_file > $output_file || echo "Timeout" > $output_file  
done