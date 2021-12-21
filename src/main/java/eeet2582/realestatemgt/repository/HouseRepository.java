package eeet2582.realestatemgt.repository;

import eeet2582.realestatemgt.model.House;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {

    Page<House> findByPriceBetween(Double low, Double high, Pageable pageable);
}
