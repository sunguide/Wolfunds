jQuery('.stockcont').each(function (i,item) {
        item = jQuery(item);
        var stock_code = item.attr('stockcode');
        var lhb_title = item.find('p:first').text();
        var buy_amount = item.find('.cell-cont p .c-rise:first').text();
        var sell_amount = item.find('.cell-cont p .c-fall').text();
        var buy_details = [];
        var sell_details = [];
        item.find('.m-table:first tr').each(function (i,item1) {
            if(i == 0) return;
            i--;
            item1 = jQuery(item1);
            var buy_details_item = [];
            item1.find('td').each(function (i,item2) {
                if(i == 0){
                    buy_details_item[i] = $(item2).find('a').attr('title') ;
                    if($(item2).find('label').length > 0){
                        buy_details_item[i] += "[" + $(item2).find('label').text() + "]";
                    }
                }else{
                    buy_details_item[i]= $(item2).text();
                }
            });
            buy_details[i] = buy_details_item;
        });
        item.find('.m-table:last tr').each(function (i,item1) {
            if(i == 0) return;
            i--;
            item1 = jQuery(item1);
            var sell_details_item = [];
            item1.find('td').each(function (i,item2) {
                if(i == 0){
                    sell_details_item[i] = $(item2).find('a').attr('title') ;
                    if($(item2).find('label').length > 0){
                        sell_details_item[i] += "[" + $(item2).find('label').text() + "]";
                    }
                }else{
                    sell_details_item[i]= $(item2).text();
                }
            });
            sell_details[i] = sell_details_item;
        });
        var lbs = {stock_code:stock_code,title:lhb_title,buy_amount:buy_amount,sell_amount:sell_amount,
            buy_details:buy_details,sell_details:sell_details};
        console.log(lbs);
    });
