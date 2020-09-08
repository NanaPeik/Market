
declare var $: any
export class uploadImage {
    //
    onInputChange(input, imgArray) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e: any) {
                if (imgArray.includes(e.target.result)) {
                    alert('ასეთი სურათი უკვე არსებობს')
                }
                else {
                    imgArray.push(e.target.result)
                    $(input).val('')
                }
            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }
}