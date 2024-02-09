package com.chatappbackend.chapappbackend.pagination;

public class pageRequest implements pageable{
    private Integer page;
    private Integer maxPageItem;
    private Integer totalsPage;
    private Integer pageStart;
    @Override
    public Integer getPage() {
        if(this.page != null) {
            return this.page - 1;
        }
        return null;
    }

    @Override
    public Integer getMaxPageItem() {
        return this.maxPageItem;
    }

    public void setPage(Integer page) {
        this.page = page;
    }


    public void setTotalsPage(Integer totalsPage) {
        this.totalsPage = totalsPage;
    }


	public pageRequest(Integer page, Integer totalPages) {

        this.page = page;
        this.totalsPage = totalPages;
    }


    @Override
    public Integer getTotalsPage() {

        return this.totalsPage;
    }

    @Override
    public void setTotalsPage(int totalsPage) {
        this.totalsPage = totalsPage;
    }


    @Override
    public void setPage(int page) {
        this.page = page;


    }


    @Override
    public Integer getPageStart() {

        return this.page + 1;
    }



}
