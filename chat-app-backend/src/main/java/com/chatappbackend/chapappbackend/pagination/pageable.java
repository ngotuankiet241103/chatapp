package com.chatappbackend.chapappbackend.pagination;

public interface pageable {
    Integer getPage();
    Integer getMaxPageItem();
    Integer getTotalsPage();
    void setTotalsPage(int totalsPage);
    void setPage(int page);
    Integer getPageStart();
}
